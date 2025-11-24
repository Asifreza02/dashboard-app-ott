import {
  getDashboardData,
  getRevenueTrendData,
  getStreamingTrendData,
  getCallerTuneData
} from '@/utils/data';
import Dashboard from '@/components/Dashboard';

export default async function Home() {
  const data = await getDashboardData();
  const revenueTrend = getRevenueTrendData();
  const streamingTrend = getStreamingTrendData();
  const callerTuneData = getCallerTuneData();

  return (
    <main>
      <Dashboard
        data={data}
        revenueTrend={revenueTrend}
        streamingTrend={streamingTrend}
        callerTuneData={callerTuneData}
      />
    </main>
  );
}
