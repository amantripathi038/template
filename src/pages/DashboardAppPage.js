import { Helmet } from 'react-helmet-async';

import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components

import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary
} from '../sections/@dashboard/app';

import {/* mapGraph1 , */ mapGraph2, expenseButtons } from '../_mock/user';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title> Dashboard | Budget Manager </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Expenses" total={expenseButtons[0]} icon={'mdi:event-week-end-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Today's Expense" total={expenseButtons[1]} color="info" icon={'mdi:time-of-day'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Monthly Expenses" total={expenseButtons[2]} color="warning" icon={'material-symbols:calendar-month'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Last Month Expense" total={expenseButtons[3]} color="error" icon={'ic:outline-calendar-month'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Category"
              chartData={[
                { label: 'Bills', value: mapGraph2.get('Bills') || 0 },
                { label: 'Food', value: mapGraph2.get('Food') || 0 },
                { label: 'Medical', value: mapGraph2.get('Medical') || 0 },
                { label: 'Travel', value: mapGraph2.get('Travel') || 0 },
                { label: 'Others', value: mapGraph2.get('Others') || 0 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
