/**
 * airtableClient.ts
 *
 * Client helper to insert and query records from Airtable tables using standard fetch.
 * If credentials are not present, it logs the operations to the console and falls back.
 */

export const isAirtableConfigured = () => {
  return !!process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN && !!process.env.AIRTABLE_BASE_ID;
};

/**
 * Helper to make authenticated requests to the Airtable REST API
 */
async function airtableRequest(
  endpoint: string,
  options: { method: string; body?: any }
): Promise<{ success: boolean; data?: any; error?: string }> {
  const airtablePat = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || "";
  const airtableBaseId = process.env.AIRTABLE_BASE_ID || "";
  const url = `https://api.airtable.com/v0/${airtableBaseId}/${endpoint}`;
  
  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${airtablePat}`,
    };

    if (options.body) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.error?.message || `Airtable API error (${response.status})`;
      console.error(`[Airtable Error] Request to ${endpoint} failed:`, errorMsg, data);
      console.error(
        `[Airtable Debug Info] Base ID: "${airtableBaseId}" (length: ${airtableBaseId.length}), ` +
        `Token: "${airtablePat.substring(0, 10)}..." (length: ${airtablePat.length}), ` +
        `Endpoint: "${endpoint}"`
      );
      return { success: false, error: errorMsg };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error(`[Airtable Exception] Request to ${endpoint} failed:`, err);
    return { success: false, error: err.message || String(err) };
  }
}

/**
 * Inserts a lead record into Airtable
 */
export async function insertLead(lead: any): Promise<{ success: boolean; error?: string }> {
  if (!isAirtableConfigured()) {
    console.log("[Airtable Mock] insertLead called in dev/fallback mode.");
    return { success: true };
  }

  const leadsTable = process.env.AIRTABLE_LEADS_TABLE || "Leads";

  // Map fields into Airtable camelCase format
  const fields = {
    leadId: lead.leadId || "",
    firstName: lead.firstName || "",
    lastName: lead.lastName || "",
    email: lead.email || "",
    phone: lead.phone || "",
    company: lead.company || "",
    country: lead.country || "",
    city: lead.city || "",
    moveInDate: lead.moveInDate || "",
    leaseType: lead.leaseType || "",
    adults: Number(lead.adults) || 0,
    children: Number(lead.children) || 0,
    pets: lead.pets || "",
    budgetMin: Number(lead.budgetMin) || 0,
    budgetMax: Number(lead.budgetMax) || 0,
    currency: lead.currency || "",
    bedrooms: lead.bedrooms || "",
    furnished: lead.furnished || "",
    mustHaves: Array.isArray(lead.mustHaves) ? lead.mustHaves.join(", ") : (lead.mustHaves || ""),
  };

  const payload = {
    records: [{ fields }],
    typecast: true,
  };

  const result = await airtableRequest(leadsTable, {
    method: "POST",
    body: payload,
  });

  return { success: result.success, error: result.error };
}

/**
 * Inserts a rental application record into Airtable
 */
export async function insertApplication(app: any): Promise<{ success: boolean; error?: string }> {
  if (!isAirtableConfigured()) {
    console.log("[Airtable Mock] insertApplication called in dev/fallback mode.");
    return { success: true };
  }

  const applicationsTable = process.env.AIRTABLE_APPLICATIONS_TABLE || "Applications";

  const fields = {
    applicationId: app.applicationId || "",
    submittedAt: app.submittedAt || new Date().toISOString(),
    fullName: app.fullName || "",
    dateOfBirth: app.dateOfBirth || "",
    email: app.email || "",
    phoneCountryCode: app.phoneCountryCode || "",
    phoneNumber: app.phoneNumber || "",
    citizenship: app.citizenship || "",
    movingWith: app.movingWith || "",
    emergencyContactName: app.emergencyContactName || "",
    emergencyContactPhone: app.emergencyContactPhone || "",
    currentStreet: app.currentStreet || "",
    currentCity: app.currentCity || "",
    currentState: app.currentState || "",
    currentCountry: app.currentCountry || "",
    timeAtAddress: app.timeAtAddress || "",
    landlordName: app.landlordName || "",
    landlordPhone: app.landlordPhone || "",
    reasonForMoving: app.reasonForMoving || "",
    currentMonthlyRent: app.currentMonthlyRent || "",
    previousAddress: app.previousAddress || "",
    primaryReasonForMove: app.primaryReasonForMove || "",
    desiredStayLength: app.desiredStayLength || "",
    employerNameAddress: app.employerNameAddress || "",
    jobTitle: app.jobTitle || "",
    employmentStartDate: app.employmentStartDate || "",
    monthlyNetIncome: app.monthlyNetIncome || "",
    supervisorName: app.supervisorName || "",
    supervisorPhone: app.supervisorPhone || "",
    euVisaStatus: app.euVisaStatus || "",
    govIdFileUrl: app.govIdFileUrl || "",
    travelDocFileUrl: app.travelDocFileUrl || "",
  };

  const payload = {
    records: [{ fields }],
    typecast: true,
  };

  const result = await airtableRequest(applicationsTable, {
    method: "POST",
    body: payload,
  });

  return { success: result.success, error: result.error };
}

/**
 * Retrieves a rental application from Airtable using custom formula lookup
 */
export async function getApplicationFromAirtable(
  applicationId: string
): Promise<any | null> {
  if (!isAirtableConfigured()) {
    return null;
  }

  const applicationsTable = process.env.AIRTABLE_APPLICATIONS_TABLE || "Applications";

  // Find record by formula lookup on applicationId
  const formula = encodeURIComponent(`{applicationId} = '${applicationId}'`);
  const endpoint = `${applicationsTable}?filterByFormula=${formula}&maxRecords=1`;

  const result = await airtableRequest(endpoint, {
    method: "GET",
  });

  if (result.success && result.data?.records && result.data.records.length > 0) {
    const record = result.data.records[0];
    // Map Airtable fields back to our ApplicationRecord format
    return {
      id: record.id,
      ...record.fields,
    };
  }

  return null;
}
