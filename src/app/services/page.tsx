import { Column, Heading, Meta, Text, Flex } from "@once-ui-system/core";
import { baseURL, work } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Flex
      fillWidth
      maxWidth="m"
      direction="column"
      horizontal="center"
      paddingY="xl"
      gap="xl"
    >
      <Column gap="m" horizontal="center">
        <Heading wrap="balance" variant="display-strong-l">
          Our Services
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          Explore our range of solutions designed to help you succeed.
        </Text>
      </Column>
    </Flex>
  );
}
