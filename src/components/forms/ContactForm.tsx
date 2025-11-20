"use client";

import { useState } from "react";
import { Button, Input, Textarea, Text, Column, Row } from "@once-ui-system/core";

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "Thank you for contacting us! We'll get back to you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        if (onSuccess) onSuccess();
      } else {
        setFormStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Column as="form" onSubmit={handleSubmit} gap="16" fillWidth>
      {/* Name */}
      <Column gap="8">
        <Text variant="label-default-s" onBackground="neutral-strong">
          Name <span style={{ color: "var(--static-red)" }}>*</span>
        </Text>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          required
        />
      </Column>

      {/* Email & Phone Row */}
      <Row gap="16" s={{ direction: "column" }}>
        <Column gap="8" flex={1}>
          <Text variant="label-default-s" onBackground="neutral-strong">
            Email <span style={{ color: "var(--static-red)" }}>*</span>
          </Text>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </Column>

        <Column gap="8" flex={1}>
          <Text variant="label-default-s" onBackground="neutral-strong">
            Phone (Optional)
          </Text>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0123456789"
          />
        </Column>
      </Row>

      {/* Subject */}
      <Column gap="8">
        <Text variant="label-default-s" onBackground="neutral-strong">
          Subject
        </Text>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="How can we help?"
        />
      </Column>

      {/* Message */}
      <Column gap="8">
        <Text variant="label-default-s" onBackground="neutral-strong">
          Message <span style={{ color: "var(--static-red)" }}>*</span>
        </Text>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          rows={6}
          required
        />
      </Column>

      {/* Status Message */}
      {formStatus.type && (
        <Text
          variant="body-default-s"
          onBackground={formStatus.type === "success" ? "success-medium" : "danger-medium"}
        >
          {formStatus.message}
        </Text>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="l"
        variant="primary"
        fillWidth
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </Column>
  );
}
