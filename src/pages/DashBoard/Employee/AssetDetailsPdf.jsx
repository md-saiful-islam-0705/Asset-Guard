import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: '1px solid #eee',
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 20,
  },
});

// Create Document Component
const AssetDetailsPDF = ({ assetRequest }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Company Name</Text>
      <View style={styles.section}>
        <Text style={styles.title}>Asset Details</Text>
        <Text style={styles.text}>Asset Name: {assetRequest.assetName}</Text>
        <Text style={styles.text}>Asset Type: {assetRequest.assetType}</Text>
        <Text style={styles.text}>
          Request Date: {new Date(assetRequest.requestDate).toLocaleDateString('en-GB')}
        </Text>
        <Text style={styles.text}>
          Approval Date: {assetRequest.approvalDate ? new Date(assetRequest.approvalDate).toLocaleDateString('en-GB') : "N/A"}
        </Text>
        <Text style={styles.text}>Request Status: {assetRequest.requestStatus}</Text>
        <Text style={styles.text}>Additional Notes: {assetRequest.additionalNotes}</Text>
      </View>
      <Text style={styles.footer}>Printing Date: {new Date().toLocaleDateString('en-GB')}</Text>
    </Page>
  </Document>
);

export default AssetDetailsPDF;
