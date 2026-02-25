# claimflow-africa-be


 ### claim management system for the claimflow project, each model and its purpose in your application:

1. Clinic Model (clinic.js)
Represents: A medical clinic or healthcare facility.
Fields:


id → unique identifier for the clinic


name → clinic name


address → physical address


contact_number → phone number


Purpose: Clinics are the main entities that submit claims. Other models, like User or Claim, are associated with a clinic.



2. User Model (user.js)
Represents: A user in the system (billing officer, manager, pharmacist, regulator).


Fields:


id → unique user ID


clinic_id → the clinic the user belongs to


name → user’s full name


email → login email


role → role in the system (billing_officer, clinic_manager, etc.)


password_hash → hashed password for authentication


pin_code → optional code for extra security


Purpose: Handles authentication and authorization. Users perform actions such as submitting claims, reviewing, or approving them.



3. Claim Model (claim.js)
Represents: A patient claim submitted by a clinic.


Fields:


id → unique claim ID


clinic_id → which clinic submitted it


user_id → which user submitted it


patient_name, patient_id → patient info


claim_amount → amount requested


status → current state (draft, submitted, denied, approved, paid)


denial_score, penalty_amount → automatic scoring and penalties


submission_date → when claim was submitted


Purpose: Tracks all claims in the system and their lifecycle.



4. Denial Rules Model (denialRule.js)
Represents: Rules for automatically denying claims.


Fields:


rule_name → short name of the rule


description → what the rule checks for


severity → low/medium/high impact


Purpose: Helps the system decide if a claim should be denied automatically based on certain conditions.


5. Penalty Rules Model (penaltyRule.js)
Represents: Rules for applying penalties to claims.


Fields:


rule_name → name of the rule


description → details of the penalty


penalty_percent → percentage of penalty


Purpose: Determines financial penalties for certain claim violations.



6. AR Aging Model (arAging.js)
Represents: Aging buckets for claims that are outstanding.


Fields:


claim_id → links to a specific claim


aging_bucket → how old the claim is (0-30, 31-60, etc.)


Purpose: Tracks how long claims remain unpaid, useful for reporting and managing accounts receivable.



7. SDG8 Metrics Model (sdg8Metrics.js)
Represents: Metrics for Sustainable Development Goal 8 (decent work).


Fields:


clinic_id → the clinic the metric belongs to


month → period (YYYY-MM)


salary_delay_incidents, staff_overtime_hours, penalties_avoided, claims_saved → KPIs


Purpose: Provides reporting on labor practices and financial efficiency per clinic.



8. Audit Logs Model (auditLog.js)
Represents: Activity logs for auditing.


Fields:


table_name → which table was affected


record_id → which record changed


action → insert/update/delete


performed_by → user who did the action


hash_sha256 → cryptographic hash of the change


Purpose: Tracks all changes to ensure accountability and support forensic investigations if needed.


