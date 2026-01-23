'use client'

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Image,
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
      marginBottom: 8,
    },

    area: {
      fontSize: 18,
      marginBottom: 24,
      color: '#6B7280',
    },

    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 12,
      gap: 12,
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
      gap: 8,
    },

    itemEducation: {
      marginBottom: 12,
      paddingLeft: 8,
      borderLeftWidth: 3,
      borderLeftColor: "#22C55E",
      gap: 8,
    },

    itemSummary: {
      borderLeftWidth: 3,
      borderLeftColor: "#64748B",
      paddingLeft: 8,
    },

    itemProjects: {
      marginBottom: 12,
      paddingLeft: 8,
      borderLeftWidth: 3,
      borderLeftColor: "#A855F7",
      gap: 8,
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

    icon: {
      width: 12,
      height: 12,
      marginRight: -5,
    },
  });

  
  const normalizeUrl = (url) => {
    if (!url) return null
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return `https://${url}`
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personal?.name || "Seu Nome"}
          </Text>
          <Text style={styles.area}>
            {personal?.area}
          </Text>

          <View style={styles.row}>
            {personal?.email && <Image
              src={"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4e7.png"}
              style={styles.icon}
              alt="email icon"
            />}
            {personal?.email && <Text>
              {personal.email}
            </Text>}

            {personal?.phone && <Image
              src={"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4de.png"}
              style={styles.icon}
              alt="phone icon"
            />}
            {personal?.phone && <Text>
              {personal.phone}
            </Text>}

            {personal?.location &&
              <Image
                src={"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4cd.png"}
                style={styles.icon}
                alt="location icon"
              />
            }
            {personal?.location && <Text>
              {personal.location}
            </Text>}
          </View>

          <View style={styles.row}>
            {personal?.linkedin &&
              <Image
                src={"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f517.png"}
                style={styles.icon}
                alt="link icon"
              />
            }
            {personal?.linkedin && (
              <Text>
                <Link src={normalizeUrl(personal.linkedin)} style={styles.link}>
                  LinkedIn
                </Link>
              </Text>
            )}

            {personal?.github &&
              <Image
                src={"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f517.png"}
                style={styles.icon}
                alt="link icon"
              />
            }
            {personal?.github && (
              <Text>
                <Link src={normalizeUrl(personal.github)} style={styles.link}>
                  GitHub
                </Link>
              </Text>
            )}

            {personal?.portfolio &&
              <Image
                src={"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4bc.png"}
                style={styles.icon}
                alt="portfolio icon"
              />
            }
            {personal?.portfolio && (
              <Text>
                <Link src={normalizeUrl(personal.portfolio)} style={styles.link}>
                  {t("Portfolio")}
                </Link>
              </Text>
            )}
          </View>
        </View>

        {/* SUMMARY */}
        {personal?.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {t("About Me")}
            </Text>
            <Text style={styles.itemSummary}>{personal.summary}</Text>
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
                <View style={{gap: 4}}>
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
                </View>

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
                    <Link src={normalizeUrl(project.url)} style={styles.link}>
                      {t("Live Demo")}
                    </Link>
                  )}
                  {project.github && (
                    <Link src={normalizeUrl(project.github)} style={styles.link}>
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
