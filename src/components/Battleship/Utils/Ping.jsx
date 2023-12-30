function Ping() {
  let aspect;
  if (window.innerHeight <= window.innerWidth) {
    aspect = "height";
  } else {
    aspect = "width";
  }

  // if (axis.length > 0) {
  //   let test = axis.filter((item, index) => {
  //     let tempTest = tempQueue.filter((el) => {
  //       return el[item.axis] === item.num;
  //     });
  //     return tempTest.length > 0;
  //   });
  //   console.log({ test });
  //   if (test.length > 0) {
  //     tempQueue = tempQueue.filter((el, index) => {
  //       return el[test[0].axis] === test[0].num;
  //     });
  //   }
  // }
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div
          className={
            "animate-pulse animate-infinite animate-duration-[4000] flex justify-center items-center rounded-full absolute border border-8 border-[#39FF14] z-50 " +
            (aspect === "height" && " h-[80vh] w-[80vh] ") +
            (aspect === "width" && " h-[80vw] w-[80vw] ")
          }
        >
          <div
            className={
              "animate-pulse animate-infinite animate-duration-[4000] flex justify-center items-center rounded-full absolute border border-8 border-[#39FF14] z-50 " +
              (aspect === "height" && " h-[60vh] w-[60vh] ") +
              (aspect === "width" && " h-[60vw] w-[60vw] ")
            }
          >
            <div
              className={
                "animate-pulse animate-infinite animate-duration-[4000] flex justify-center items-center rounded-full absolute border border-8 border-[#39FF14] z-50 " +
                (aspect === "height" && " h-[40vh] w-[40vh] ") +
                (aspect === "width" && " h-[40vw] w-[40vw] ")
              }
            >
              {/* <div
                className={
                  "flex justify-center items-center  " +
                  (aspect == "height" && " w-[80vh] ") +
                  (aspect == "widtht" && " w-[80vw] ")
                }
              > */}
              <div
                className={
                  "  h-5 animate-spin animate-once animate-duration-1000" +
                  (aspect == "height" && " w-[80vh]  ") +
                  (aspect == "width" && " w-[80vw]  ")
                }
              >
                <div
                  className={
                    " bg-[#39FF14] h-3 w-full animate-pulse animate-infinite animate-duration-[4000] " +
                    (aspect == "height" && " pl-[40vh] w- ") +
                    (aspect == "width" && " pl-[40vw]  ")
                  }
                ></div>
                <div className="w-full"></div>
              </div>
              {/* </div> */}
              {/* <div
                className={
                  "animate-pulse animate-infinite animate-duration-[4000]  rounded-full absolute bg-[#39FF14] z-50 " +
                  (aspect === "height" && " h-[20vh] w-[20vh] ") +
                  (aspect === "width" && " h-[20vw] w-[20vw] ")
                }
              ></div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ping;
