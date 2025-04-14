import React from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { Link, Typography } from "@mui/material";
import { numberFormat } from "../../utilities/helpers";

// const RecentTransactions = () => {
//   return (
//     <DashboardCard title="Recent Transactions">
//       <>
//         <Timeline
//           className="theme-timeline"
//           nonce={undefined}
//           onResize={undefined}
//           onResizeCapture={undefined}
//           sx={{
//             p: 0,
//             mb: '-40px',
//             '& .MuiTimelineConnector-root': {
//               width: '1px',
//               backgroundColor: '#efefef'
//             },
//             [`& .${timelineOppositeContentClasses.root}`]: {
//               flex: 0.5,
//               paddingLeft: 0,
//             },
//           }}
//         >
//           <TimelineItem>
//             <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
//             <TimelineSeparator>
//               <TimelineDot color="primary" variant="outlined" />
//               <TimelineConnector />
//             </TimelineSeparator>
//             <TimelineContent>Payment received from John Doe of $385.90</TimelineContent>
//           </TimelineItem>
//           <TimelineItem>
//             <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
//             <TimelineSeparator>
//               <TimelineDot color="secondary" variant="outlined" />
//               <TimelineConnector />
//             </TimelineSeparator>
//             <TimelineContent>
//               <Typography fontWeight="600">New sale recorded</Typography>{' '}
//               <Link href="/" underline="none">
//                 #ML-3467
//               </Link>
//             </TimelineContent>
//           </TimelineItem>
//           <TimelineItem>
//             <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
//             <TimelineSeparator>
//               <TimelineDot color="success" variant="outlined" />
//               <TimelineConnector />
//             </TimelineSeparator>
//             <TimelineContent>Payment was made of $64.95 to Michael</TimelineContent>
//           </TimelineItem>
//           <TimelineItem>
//             <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
//             <TimelineSeparator>
//               <TimelineDot color="warning" variant="outlined" />
//               <TimelineConnector />
//             </TimelineSeparator>
//             <TimelineContent>
//               <Typography fontWeight="600">New sale recorded</Typography>{' '}
//               <Link href="/" underline="none">
//                 #ML-3467
//               </Link>
//             </TimelineContent>
//           </TimelineItem>
//           <TimelineItem>
//             <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
//             <TimelineSeparator>
//               <TimelineDot color="error" variant="outlined" />
//               <TimelineConnector />
//             </TimelineSeparator>
//             <TimelineContent>
//               <Typography fontWeight="600">New arrival recorded</Typography>
//             </TimelineContent>
//           </TimelineItem>
//           <TimelineItem>
//             <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
//             <TimelineSeparator>
//               <TimelineDot color="success" variant="outlined" />
//             </TimelineSeparator>
//             <TimelineContent>Payment Received</TimelineContent>
//           </TimelineItem>
//         </Timeline>
//       </>
//     </DashboardCard>
//   );
// };

const RecentTransactions = ({ loading, recentTransactions }) => {
  return (
    <DashboardCard title="Recent Transactions">
      <>
        <Timeline
          className="theme-timeline"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          sx={{
            p: 0,
            mb: "-40px",
            "& .MuiTimelineConnector-root": {
              width: "1px",
              backgroundColor: "#efefef",
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {recentTransactions?.map((tx) => (
            <TimelineItem key={tx?.tx_ref}>
              <TimelineOppositeContent>
                {new Date(tx?.createdAt).toDateString()}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={getColorByPaymentType(tx?.reason)}
                  variant="outlined"
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                {`Payment received from ${tx?.first_name} ${tx?.last_name} of `}
                <b>{`${numberFormat(tx?.amount)} ${tx?.currency}`}</b>
              </TimelineContent>
            </TimelineItem>
          ))}

          {/* <TimelineItem>
            <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New sale recorded</Typography>{" "}
              <Link href="/" underline="none">
                #ML-3467
              </Link>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Payment was made of $64.95 to Michael
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New sale recorded</Typography>{" "}
              <Link href="/" underline="none">
                #ML-3467
              </Link>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New arrival recorded</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>Payment Received</TimelineContent>
          </TimelineItem> */}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentTransactions;

export function getColorByPaymentType(type) {
  switch (type) {
    case "Partnership":
      return "success";
    case "Donation":
      return "info";
    case "Visitor":
      return "warning";
    case "BibleStudy":
      return "secondary";
    case "TeachingSales":
      return "error";
    default:
      return "info";
  }
}
