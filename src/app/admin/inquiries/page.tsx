import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import type { ContactSubmission, LoanInquiry } from "@/lib/supabase";
import { formatDate } from "@/utils/formatDate";
import { InquiryActions } from "./InquiryActions";
import styles from "../admin.module.css";

async function getInquiries() {
  try {
    const supabase = await createAdminSupabaseClient();

    const { data: contacts } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    const { data: loans } = await supabase
      .from("loan_inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    return {
      contacts: (contacts || []) as ContactSubmission[],
      loans: (loans || []) as LoanInquiry[],
    };
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return {
      contacts: [],
      loans: [],
    };
  }
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case "new":
    case "pending":
      return styles.badgeWarning;
    case "read":
    case "contacted":
      return styles.badgeInfo;
    case "responded":
    case "approved":
    case "completed":
      return styles.badgeSuccess;
    case "rejected":
    case "archived":
      return styles.badgeDanger;
    default:
      return styles.badgeNeutral;
  }
}

export default async function InquiriesPage() {
  await requireAdminSession();
  const { contacts, loans } = await getInquiries();

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Inquiries</h1>
        <p className={styles.pageSubtitle}>
          Manage contact submissions and loan inquiries
        </p>
      </div>

      {/* Loan Inquiries Section */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Loan Inquiries ({loans.length})
        </h2>
      </div>

      {loans.length === 0 ? (
        <div className={`${styles.card} ${styles.emptyState}`}>
          <div className={styles.emptyStateIcon}>📋</div>
          <p className={styles.emptyStateText}>No loan inquiries yet</p>
        </div>
      ) : (
        <div className={styles.sectionMargin}>
          {loans.map((loan) => (
            <div key={loan.id} className={styles.listItem}>
              <div className={styles.listItemHeader}>
                <div className={styles.listItemContent}>
                  <div className={styles.listItemTitleRow}>
                    <span className={styles.listItemTitle}>{loan.full_name}</span>
                    <span className={`${styles.badge} ${getStatusBadgeClass(loan.status)}`}>
                      {loan.status}
                    </span>
                  </div>
                  <p className={styles.listItemSubtext}>
                    {loan.email} • {loan.phone}
                  </p>
                  <p className={styles.listItemDetail}>
                    <strong>Loan Type:</strong> {loan.loan_type}
                    {loan.loan_amount && <> • <strong>Amount:</strong> RM {loan.loan_amount.toLocaleString()}</>}
                  </p>
                  {loan.message && (
                    <p className={styles.listItemMessage}>
                      {loan.message}
                    </p>
                  )}
                  <p className={styles.listItemMeta}>{formatDate(loan.created_at)}</p>
                </div>
                <div className={styles.listItemActions}>
                  <InquiryActions
                    id={loan.id}
                    type="loan"
                    currentStatus={loan.status}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Submissions Section */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Contact Submissions ({contacts.length})
        </h2>
      </div>

      {contacts.length === 0 ? (
        <div className={`${styles.card} ${styles.emptyState}`}>
          <div className={styles.emptyStateIcon}>📧</div>
          <p className={styles.emptyStateText}>No contact submissions yet</p>
        </div>
      ) : (
        <div>
          {contacts.map((contact) => (
            <div key={contact.id} className={styles.listItem}>
              <div className={styles.listItemHeader}>
                <div className={styles.listItemContent}>
                  <div className={styles.listItemTitleRow}>
                    <span className={styles.listItemTitle}>{contact.name}</span>
                    <span className={`${styles.badge} ${getStatusBadgeClass(contact.status)}`}>
                      {contact.status}
                    </span>
                  </div>
                  <p className={styles.listItemSubtext}>
                    {contact.email}
                    {contact.phone && <> • {contact.phone}</>}
                  </p>
                  {contact.subject && (
                    <p className={styles.listItemDetail}>
                      <strong>Subject:</strong> {contact.subject}
                    </p>
                  )}
                  <p className={styles.listItemMessage}>
                    {contact.message}
                  </p>
                  <p className={styles.listItemMeta}>{formatDate(contact.created_at)}</p>
                </div>
                <div className={styles.listItemActions}>
                  <InquiryActions
                    id={contact.id}
                    type="contact"
                    currentStatus={contact.status}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
