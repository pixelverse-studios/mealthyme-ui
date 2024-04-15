'use client'
import StyledFooter from './StyledFooter'
import { Typography, Container, Grid, Link } from '@mui/material'

const Footer = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Email support */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="textPrimary">
              Support
            </Typography>
            <Typography variant="body2" color="textSecondary">
              For support, please email us at{' '}
              <Link href="mailto:info@pixelverse.io">info@pixelverse.io</Link>
            </Typography>
          </Grid>

          {/* Terms and Conditions */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="textPrimary">
              Terms and Conditions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {/* Use AI-generated terms and conditions */}
              View Terms
            </Typography>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="textPrimary">
              Socials
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="https://discord.com">Discord</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  )
}

export default Footer
