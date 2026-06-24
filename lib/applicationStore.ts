/**
 * applicationStore.ts
 *
 * Thin wrapper around Vercel KV for storing rental applications.
 * In development (no KV credentials), falls back to in-memory storage
 * and logs records to the console.
 *
 * Production setup:
 *   1. Create a Vercel KV database in your Vercel project dashboard
 *   2. Add KV_REST_API_URL and KV_REST_API_TOKEN to .env.local
 *   3. npm install @vercel/kv
 *   4. Uncomment the KV block below
 */

export interface ApplicationRecord {
  applicationId: string;
  submittedAt: string;
  // Section 1
  fullName: string;
  dateOfBirth: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  citizenship: string;
  movingWith: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  // Section 2
  currentStreet: string;
  currentCity: string;
  currentState: string;
  currentCountry: string;
  timeAtAddress: string;
  landlordName?: string;
  landlordPhone?: string;
  reasonForMoving: string;
  currentMonthlyRent: string;
  previousAddress?: string;
  // Section 3
  primaryReasonForMove: string;
  desiredStayLength: string;
  employerNameAddress: string;
  jobTitle: string;
  employmentStartDate: string;
  monthlyNetIncome: string;
  supervisorName: string;
  supervisorPhone: string;
  euVisaStatus: string;
  // Section 4 — file URLs (from Vercel Blob or local stub)
  govIdFileUrl: string;
  travelDocFileUrl: string;
}

import {
  insertApplication,
  isAirtableConfigured,
  getApplicationFromAirtable,
} from "./airtableClient";

// ── In-memory dev store ────────────────────────────────────────────────────
const devStore = new Map<string, ApplicationRecord>();

export async function saveApplication(record: ApplicationRecord): Promise<void> {
  if (isAirtableConfigured()) {
    const { success, error } = await insertApplication(record);
    if (!success) {
      throw new Error(`Failed to save application to Airtable: ${error}`);
    }
  } else {
    // Dev mode — in-memory only
    devStore.set(record.applicationId, record);
    console.log(`\n[applicationStore] 📁 Application saved (dev mode)`);
    console.log(`  ID:    ${record.applicationId}`);
    console.log(`  Name:  ${record.fullName}`);
    console.log(`  Email: ${record.email}`);
    console.log(`  Total stored: ${devStore.size}\n`);
  }
}

export async function getApplication(applicationId: string): Promise<ApplicationRecord | null> {
  if (isAirtableConfigured()) {
    try {
      const data = await getApplicationFromAirtable(applicationId);
      if (!data) {
        return null;
      }
      return data as any;
    } catch (err) {
      console.error("[applicationStore] getApplication exception:", err);
      return null;
    }
  }

  if (devStore.has(applicationId)) return devStore.get(applicationId)!;
  return null;
}

export function generateApplicationId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GETBNB-${timestamp}-${random}`;
}
