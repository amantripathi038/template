import { Helmet } from 'react-helmet-async';

import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components

import {
    AppCurrentVisits,
    AppWebsiteVisits,
} from '../sections/@dashboard/app';

import { dates, spends, mapGraph2, expenseButtons } from '../_mock/user';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
    const theme = useTheme();

    const increasePercentage = ((expenseButtons[2] - expenseButtons[3]) * 100 / expenseButtons[3]).toFixed(1);
    const sign = increasePercentage >= 0 ? "+" : "";
    const increaseString = `${sign}${increasePercentage}% than last month`
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


                    <Grid item xs={12} md={12} lg={12}>
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
                </Grid>
            </Container>
        </>
    );
}
