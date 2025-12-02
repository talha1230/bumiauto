import { Button, Flex, Heading, Text, RevealFx, Column } from "@once-ui-system/core";
import { routes } from "@/resources";

export default function Home() {
  return (
    <Flex
      fillWidth
      paddingTop="l"
      paddingX="l"
      direction="column"
      horizontal="center"
      flex={1}
    >
      <Flex
        position="relative"
        as="section"
        overflow="hidden"
        fillWidth
        minHeight="0"
        maxWidth={68}
        direction="column"
        horizontal="center"
        flex={1}
      >
        <Flex
          as="main"
          direction="column"
          vertical="center"
          fillWidth
          fillHeight
          padding="l"
          gap="l"
        >
          <Column
            fillWidth
            gap="32"
            horizontal="center"
            align="center"
          >
            <RevealFx translateY="4">
              <Heading wrap="balance" variant="display-strong-l">
                Welcome to Your Website
              </Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2}>
              <Text wrap="balance" onBackground="neutral-weak" variant="body-default-l" style={{ maxWidth: "48rem" }}>
                Start building your dream website with this clean template.
              </Text>
            </RevealFx>
            <RevealFx translateY="12" delay={0.4}>
              <Flex gap="12">
                {routes["/contact"] && (
                  <Button
                    data-border="rounded"
                    href="/contact"
                    variant="primary"
                    size="l"
                  >
                    Get Started
                  </Button>
                )}
                {routes["/services"] && (
                  <Button
                    data-border="rounded"
                    href="/services"
                    variant="secondary"
                    size="l"
                  >
                    Learn More
                  </Button>
                )}
              </Flex>
            </RevealFx>
          </Column>
        </Flex>
      </Flex>
    </Flex>
  );
}
