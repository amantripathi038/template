import { Helmet } from 'react-helmet-async';

import { Grid, Container, Typography } from '@mui/material';
// components

import {
    AppConversionRates,
    AppWebsiteVisits
} from '../sections/@dashboard/app';

import { monthGraphArray, mapGraph3, thisMonthArray, previousMonthArray, prePreviousMonthArray, dateLabels } from '../_mock/user';
import FloatingButton from './FloatingButton';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {

    return (
        <>
            <Helmet>
                <title> Deep Analysis | BudMan </title>
            </Helmet>

            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Deep Analysis
                </Typography>
                <Grid item xs={12} md={6} lg={8}>
                    <AppConversionRates
                        title="Month-wise Expenses"
                        subheader=""
                        chartData={monthGraphArray}
                        height={456}
                    />
                </Grid>
                <br />
                <Grid item xs={12} md={6} lg={8}>
                    <AppWebsiteVisits
                        title="Compare Expenses"
                        subheader=""
                        chartLabels={dateLabels}
                        chartData={[
                            {
                                name: 'This Month',
                                type: 'bar',
                                fill: 'solid',
                                data: thisMonthArray,
                            },
                            {
                                name: 'Previous Month',
                                type: 'area',
                                fill: 'gradient',
                                data: previousMonthArray,
                            },
                            {
                                name: 'Pre-Previous Month',
                                type: 'line',
                                fill: 'solid',
                                data: prePreviousMonthArray,
                            },
                        ]}
                    />
                </Grid>
                <br />
                <Grid item xs={12} md={6} lg={8}>
                    <AppConversionRates
                        title="Category-wise Expenses (All Time)"
                        subheader=""
                        chartData={[
                            { label: 'Bills', value: mapGraph3.get('Bills') || 0 },
                            { label: 'Food', value: mapGraph3.get('Food') || 0 },
                            { label: 'Medical', value: mapGraph3.get('Medical') || 0 },
                            { label: 'Travel', value: mapGraph3.get('Travel') || 0 },
                            { label: 'Others', value: mapGraph3.get('Others') || 0 },
                        ]}
                        height={230}
                    />
                </Grid>
            </Container>
            <FloatingButton />
        </>
    );
}
