import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase";
import type { ContactSubmission, LoanInquiry } from "@/lib/supabase";
import {
  Column,
  Heading,
  Text,
  Row,
  Card,
  Tag,
  Button,
} from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { InquiryActions } from "./InquiryActions";

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

function getStatusColor(status: string) {
  switch (status) {
    case "new":
    case "pending":
      return "warning";
    case "read":
    case "contacted":
      return "info";
    case "responded":
    case "approved":
    case "completed":
      return "success";
    case "rejected":
    case "archived":
      return "danger";
    default:
      return "neutral";
  }
}

export default async function InquiriesPage() {
  await requireAdminSession();
  const { contacts, loans } = await getInquiries();

  return (
    <Column gap="xl" fillWidth>
      <Column gap="s">
        <Heading variant="display-strong-m">Inquiries</Heading>
        <Text variant="body-default-l" onBackground="neutral-weak">
          Manage contact submissions and loan inquiries
        </Text>
      </Column>

      {/* Loan Inquiries Section */}
      <Column gap="m">
        <Heading variant="heading-strong-m">Loan Inquiries</Heading>
        {loans.length === 0 ? (
          <Card padding="l" border="neutral-alpha-weak">
            <Text onBackground="neutral-weak">No loan inquiries yet</Text>
          </Card>
        ) : (
          <Column gap="s">
            {loans.map((loan) => (
              <Card
                key={loan.id}
                padding="m"
                radius="m"
                border="neutral-alpha-weak"
              >
                <Row gap="m" vertical="start" wrap>
                  <Column gap="xs" style={{ flex: 1, minWidth: "200px" }}>
                    <Row gap="s" vertical="center">
                      <Text variant="heading-strong-s">{loan.full_name}</Text>
                      <Tag
                        variant={getStatusColor(loan.status) as any}
                        size="s"
                        label={loan.status}
                      />
                    </Row>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {loan.email} • {loan.phone}
                    </Text>
                    <Text variant="body-default-s">
                      Loan Type: {loan.loan_type}
                      {loan.loan_amount && ` • Amount: RM ${loan.loan_amount}`}
                    </Text>
                    {loan.message && (
                      <Text
                        variant="body-default-xs"
                        onBackground="neutral-weak"
                        style={{ marginTop: "8px" }}
                      >
                        {loan.message}
                      </Text>
                    )}
                    <Text
                      variant="body-default-xs"
                      onBackground="neutral-weak"
                      style={{ marginTop: "8px" }}
                    >
                      {formatDate(loan.created_at)}
                    </Text>
                  </Column>
                  <InquiryActions
                    id={loan.id}
                    type="loan"
                    currentStatus={loan.status}
                  />
                </Row>
              </Card>
            ))}
          </Column>
        )}
      </Column>

      {/* Contact Submissions Section */}
      <Column gap="m">
        <Heading variant="heading-strong-m">Contact Submissions</Heading>
        {contacts.length === 0 ? (
          <Card padding="l" border="neutral-alpha-weak">
            <Text onBackground="neutral-weak">No contact submissions yet</Text>
          </Card>
        ) : (
          <Column gap="s">
            {contacts.map((contact) => (
              <Card
                key={contact.id}
                padding="m"
                radius="m"
                border="neutral-alpha-weak"
              >
                <Row gap="m" vertical="start" wrap>
                  <Column gap="xs" style={{ flex: 1, minWidth: "200px" }}>
                    <Row gap="s" vertical="center">
                      <Text variant="heading-strong-s">{contact.name}</Text>
                      <Tag
                        variant={getStatusColor(contact.status) as any}
                        size="s"
                        label={contact.status}
                      />
                    </Row>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {contact.email}
                      {contact.phone && ` • ${contact.phone}`}
                    </Text>
                    {contact.subject && (
                      <Text variant="body-default-s">
                        Subject: {contact.subject}
                      </Text>
                    )}
                    <Text
                      variant="body-default-xs"
                      onBackground="neutral-weak"
                      style={{ marginTop: "8px" }}
                    >
                      {contact.message}
                    </Text>
                    <Text
                      variant="body-default-xs"
                      onBackground="neutral-weak"
                      style={{ marginTop: "8px" }}
                    >
                      {formatDate(contact.created_at)}
                    </Text>
                  </Column>
                  <InquiryActions
                    id={contact.id}
                    type="contact"
                    currentStatus={contact.status}
                  />
                </Row>
              </Card>
            ))}
          </Column>
        )}
      </Column>
    </Column>
  );
}
