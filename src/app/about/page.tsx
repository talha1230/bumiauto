import {
  Column,
  Heading,
  Text,
  Meta,
  Flex,
} from "@once-ui-system/core";
import { baseURL, about } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
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
        <Heading variant="display-strong-l" wrap="balance">
          About Us
        </Heading>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          wrap="balance"
        >
          Your about page content goes here. Tell your story.
        </Text>
      </Column>
    </Flex>
  );
}
