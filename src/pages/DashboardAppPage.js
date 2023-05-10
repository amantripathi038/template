import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary
} from '../sections/@dashboard/app';

import { dates, spends, mapGraph2, expenseButtons, monthGraphArray } from '../_mock/user';
import FloatingButton from './FloatingButton';
import store from '../store/store';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const increasePercentage = (((expenseButtons[2] - expenseButtons[3]) * 100 / expenseButtons[3]).toFixed(1)) || 0;
  const sign = increasePercentage >= 0 ? "+" : "";
  const increaseString = `${sign}${increasePercentage}% than last month`
  const currMonth = (new Date()).getMonth()
  return (
    <>
      <Helmet>
        <title> Dashboard | BudMan </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Expense" total={expenseButtons[0]} icon={'mdi:event-week-end-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Today's Expense" total={expenseButtons[1]} color="info" icon={'mdi:time-of-day'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Monthly Expense" total={monthGraphArray[currMonth].value} color="warning" icon={'material-symbols:calendar-month'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Remaining Amount" total={store.getState().user.user.salary || 0} color="error" icon={'teenyicons:rupee-outline'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Daily Expenses"
              subheader={increaseString}
              chartLabels={dates}
              chartData={[
                {
                  name: '',
                  type: 'column',
                  fill: 'solid',
                  data: spends,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Category (This Month)"
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
      <FloatingButton />
    </>
  );
}
