import { Box, Stack } from "@mui/material";
import CustomModal from "./CustomModal";

import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import "swiper/swiper-bundle.css";

export default function ImageViewer({ title, address, multiple, ...props }) {
  return (
    <CustomModal {...props} title={title || "Image Viewer"}>
      <Box
        height="65vh"
        width={"100%"}
        display={"flex"}
        justifyContent="center"
        sx={{ boxShadow: "2px 3px 4px solid #ccc" }}
      >
        {multiple ? (
          <>
            <Swiper
              modules={[Navigation, Autoplay, A11y, Pagination]}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              loop
              autoplay={{ delay: 1000 }}
              // breakpoints={{
              //   320: { slidesPerView: 1, spaceBetween: 40 },
              //   1200: { slidesPerView: 1, spaceBetween: 20 },
              // }}
            >
              {address.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <Box display={"flex"} justifyContent="center" border={0}>
                    <img
                      src={testimonial}
                      alt={index + title}
                      className="rounded-circle img-fluid"
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <img height="100%" width={"auto"} src={address} alt={title} />
        )}

        {/* {multiple && (
          <Stack
            direction={"row"}
            spacing={2}
            position={"absolute"}
            bottom={0}
            right={0}
          >
            <IconArrowLeft className="custom-prev" />
            <IconArrowRight className="custom-next" />{" "}
          </Stack>
        )} */}
      </Box>
    </CustomModal>
  );
}
