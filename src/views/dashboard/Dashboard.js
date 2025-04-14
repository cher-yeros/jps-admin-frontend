import { Box, Grid } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import { useQuery } from "@apollo/client";
import { DASHBOARD_STATS } from "../../graphql/admin";
import Blog from "./components/Blog";
import MonthlyEarnings from "./components/MonthlyEarnings";
import ProductPerformance from "./components/ProductPerformance";
import RecentTransactions from "./components/RecentTransactions";
import SalesOverview from "./components/SalesOverview";
import YearlyBreakup, { CounterCard } from "./components/YearlyBreakup";
import { numberFormat } from "../utilities/helpers";

const Dashboard = () => {
  const { data, loading } = useQuery(DASHBOARD_STATS);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <CounterCard
              title={"Parnters"}
              value={loading ? "-" : data?.stats?.partners}
            />
          </Grid>
          <Grid item xs={3}>
            <CounterCard
              title={"Members"}
              value={loading ? "-" : data?.stats?.members}
            />
          </Grid>
          <Grid item xs={3}>
            <CounterCard
              title={"Teaching Sessions"}
              value={loading ? "-" : data?.stats?.propheticSchoolSessions || 0}
            />
          </Grid>

          <Grid item xs={3}>
            <CounterCard
              title={"Blogs"}
              value={loading ? "-" : data?.stats?.blogs}
            />
          </Grid>

          <Grid item xs={12} lg={9}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CounterCard
              title={"Visitors"}
              value={loading ? "-" : data?.stats?.visitors}
            />
            <CounterCard
              title={"Foreign Transactions"}
              value={
                loading
                  ? "-"
                  : numberFormat(data?.stats?.foreign_txn || 0) + " USD"
              }
            />
            <CounterCard
              title={"Local Transactions"}
              value={
                loading
                  ? "-"
                  : numberFormat(data?.stats?.local_txn || 0) + " ETB"
              }
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions
              loading={loading}
              recentTransactions={data?.stats?.recentTransactions}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance
              loading={loading}
              subscriptions={data?.stats?.subscriptions}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
