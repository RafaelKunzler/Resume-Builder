'use client'

import { PDFDownloadLink} from '@react-pdf/renderer';
import ResumePdf from './resumePdf';

const PDFDownload = ({ personal, experience, education, projects, skills, t }) => {
  return (
    <PDFDownloadLink
        document={<ResumePdf
          personal={personal}
          experience={experience || []}
          education={education}
          projects={projects}
          skills={skills}
          t={t} />}
        fileName="resume.pdf"
      >
        {({ loading }) => (loading ? "Loading document..." : "Download PDF")}
      </PDFDownloadLink>
  )
}

export default PDFDownload