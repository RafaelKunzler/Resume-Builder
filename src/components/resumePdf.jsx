import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";

const ResumePdf = ({ personal, experience, education, projects, skills, t }) => {

  const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    color: "#111827",
  },

  header: {
    marginBottom: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 6,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    paddingBottom: 4,
    marginBottom: 10,
  },

  itemExperience: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#3B82F6",
  },

  itemEducation: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#22C55E",
  },

  itemProjects: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#A855F7",
  },

  subtitle: {
    fontSize: 13,
    fontWeight: "bold",
  },

  textMuted: {
    color: "#4B5563",
    fontSize: 10,
  },

  link: {
    color: "#2563EB",
    textDecoration: "underline",
    fontSize: 10,
  },

  badge: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 10,
    marginRight: 6,
    marginBottom: 6,
  },
});

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personal?.name || "Seu Nome"}
          </Text>

          <View style={styles.row}>
            {personal?.email && <Text>{t("Email")}: {personal.email}</Text>}
            {personal?.phone && <Text>{t("Phone")}: {personal.phone}</Text>}
            {personal?.location && <Text>{t("Location")}: {personal.location}</Text>}
          </View>

          <View style={styles.row}>
            {personal?.linkedin && (
              <Link src={personal.linkedin} style={styles.link}>
                LinkedIn
              </Link>
            )}
            {personal?.github && (
              <Link src={personal.github} style={styles.link}>
                GitHub
              </Link>
            )}
            {personal?.portfolio && (
              <Link src={personal.portfolio} style={styles.link}>
                {t("Portfolio")}
              </Link>
            )}
          </View>
        </View>

        {/* SUMMARY */}
        {personal?.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("Professional Summary")}
            </Text>
            <Text>{personal.summary}</Text>
          </View>
        )}

        {/* EXPERIENCE */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("Profissional Experience")}
            </Text>

            {experience.map((exp, index) => (
              <View key={index} style={styles.itemExperience}>
                <Text style={styles.subtitle}>{exp.role}</Text>
                <Text>{exp.company}</Text>

                {exp.location && (
                  <Text style={styles.textMuted}>{exp.location}</Text>
                )}

                <Text style={styles.textMuted}>
                  {exp.start} -{" "}
                  {exp.end === "Currently"
                    ? t("Currently")
                    : exp.end}
                </Text>

                {exp.description && (
                  <Text>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("Education")}
            </Text>

            {education.map((edu, index) => (
              <View key={index} style={styles.itemEducation}>
                <Text style={styles.subtitle}>
                  {edu.qualification}
                </Text>
                <Text>{edu.institution}</Text>

                {edu.location && (
                  <Text style={styles.textMuted}>{edu.location}</Text>
                )}

                <Text style={styles.textMuted}>
                  {edu.start} -{" "}
                  {edu.end === "Present"
                    ? t("Present")
                    : edu.end}
                </Text>

                {edu.gpa && (
                  <Text style={styles.textMuted}>
                    GPA: {edu.gpa}
                  </Text>
                )}

                {edu.takeaways && (
                  <Text>{edu.takeaways}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* PROJECTS */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("Portfolio Projects")}
            </Text>

            {projects.map((project, index) => (
              <View key={index} style={styles.itemProjects}>
                <Text style={styles.subtitle}>{project.name}</Text>
                <Text>{project.technologies}</Text>

                {project.description && (
                  <Text>{project.description}</Text>
                )}

                <View style={styles.row}>
                  {project.url && (
                    <Link src={project.url} style={styles.link}>
                      {t("Live Demo")}
                    </Link>
                  )}
                  {project.github && (
                    <Link src={project.github} style={styles.link}>
                      {t("Source Code")}
                    </Link>
                  )}
                </View>

                {project.features && (
                  <Text>{project.features}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("Skills")}
            </Text>

            <View style={styles.row}>
              {skills.map((skill, index) => (
                <Text key={index} style={styles.badge}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePdf;
