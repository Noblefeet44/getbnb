import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Inserts a lead record into the Supabase 'leads' table.
 * If Supabase is not configured, it logs the operation to the console.
 */
export async function insertLead(lead: any): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.log("[Supabase Mock] insertLead called in dev/fallback mode.");
    return { success: true };
  }

  try {
    const { error } = await supabase!
      .from("leads")
      .insert([
        {
          lead_id: lead.leadId,
          first_name: lead.firstName,
          last_name: lead.lastName,
          email: lead.email,
          phone: lead.phone || null,
          company: lead.company || null,
          country: lead.country,
          city: lead.city || null,
          move_in_date: lead.moveInDate,
          lease_type: lead.leaseType,
          adults: lead.adults,
          children: lead.children,
          pets: lead.pets || null,
          budget_min: lead.budgetMin,
          budget_max: lead.budgetMax,
          currency: lead.currency,
          bedrooms: lead.bedrooms || null,
          furnished: lead.furnished || null,
          must_haves: lead.mustHaves || [],
        },
      ]);

    if (error) {
      console.error("[Supabase Error] insertLead failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[Supabase Exception] insertLead failed:", err);
    return { success: false, error: err.message || String(err) };
  }
}

/**
 * Inserts an application record into the Supabase 'applications' table.
 * If Supabase is not configured, it logs the operation to the console.
 */
export async function insertApplication(app: any): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    console.log("[Supabase Mock] insertApplication called in dev/fallback mode.");
    return { success: true };
  }

  try {
    const { error } = await supabase!
      .from("applications")
      .insert([
        {
          application_id: app.applicationId,
          full_name: app.fullName,
          date_of_birth: app.dateOfBirth,
          email: app.email,
          phone_country_code: app.phoneCountryCode,
          phone_number: app.phoneNumber,
          citizenship: app.citizenship,
          moving_with: app.movingWith,
          emergency_contact_name: app.emergencyContactName,
          emergency_contact_phone: app.emergencyContactPhone,
          current_street: app.currentStreet,
          current_city: app.currentCity,
          current_state: app.currentState,
          current_country: app.currentCountry,
          time_at_address: app.timeAtAddress,
          landlord_name: app.landlordName || null,
          landlord_phone: app.landlordPhone || null,
          reason_for_moving: app.reasonForMoving,
          current_monthly_rent: app.currentMonthlyRent,
          previous_address: app.previousAddress || null,
          primary_reason_for_move: app.primaryReasonForMove,
          desired_stay_length: app.desiredStayLength,
          employer_name_address: app.employerNameAddress,
          job_title: app.jobTitle,
          employment_start_date: app.employmentStartDate,
          monthly_net_income: app.monthlyNetIncome,
          supervisor_name: app.supervisorName,
          supervisor_phone: app.supervisorPhone,
          eu_visa_status: app.euVisaStatus,
        },
      ]);

    if (error) {
      console.error("[Supabase Error] insertApplication failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error("[Supabase Exception] insertApplication failed:", err);
    return { success: false, error: err.message || String(err) };
  }
}
