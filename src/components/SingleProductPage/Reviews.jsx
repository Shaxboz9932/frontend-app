import { useState } from "react";
import Star from "../Helpers/icons/Star";
import InputCom from "../Helpers/InputCom";
import LoaderStyleOne from "../Helpers/Loaders/LoaderStyleOne";
import StarRating from "../Helpers/StarRating";
import { jwtDecode } from "jwt-decode";

export default function Reviews({
  reviews,
  rating,
  ratingHandler,
  name,
  nameHandler,
  email,
  emailHandler,
  phone,
  phoneHandler,
  message,
  messageHandler,
  reviewAction,
  hoverRating,
  hoverHandler,
  reviewLoading,
  restart,
  editYourReview,
  setRestart,
  deleteYourReview
}) {

  let array5 = []
  for(let i = 1; i <= 5; i++) {
    array5.push(i)
  }

  const [open, setOpen] = useState(false)

  const user_id = jwtDecode(localStorage.getItem("accessToken")).user_id

  return (
    <div className="review-wrapper w-full">
      {restart}
      <div className="w-full reviews mb-[60px]">
        {/* reviews */}
        <div className="w-full reviews mb-[60px]">
          {reviews &&
            reviews.length > 0 &&
            reviews.map((review) => (
              <div
                key={review.id}
                className="review-item bg-white px-10 py-[32px] mb-2.5"
              >
                <div className="review-author flex justify-between items-center mb-3">
                  <div className="flex space-x-3 items-center">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                      <img
                        src={`${
                          import.meta.env.VITE_PUBLIC_URL
                        }/assets/images/review-user-1.png`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[18px] font-medium text-qblack">
                        {review.user_data.last_name} {review.user_data.first_name}
                      </p>
                      {/* <p className="text-[13px] font-normal text-qgray">
                        London Uk
                      </p> */}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {array5.map((i) => (
                        <i
                          key={i}
                          className={
                            i <= review.rating
                            ? "fa-solid fa-star"
                            : "fa-regular fa-star"
                          }
                          style={{color: "rgba(255, 212, 59, 1)"}}
                        >
                        </i>
                      ))}
                    </div>
                    <span className="text-[13px] font-normal text-qblack mt-1 inline-block">
                      ({review.rating})
                    </span>
                  </div>
                </div>
                <div className="review mb-[30px]">
                  <p className="text-[15px] text-qgray leading-7 text-normal">
                    {review.comment}
                  </p>
                  <div>
                    {user_id == review.user && (
                      <>
                      {/* Open button */}
                      <button
                        onClick={() => setOpen(true)}
                        className="rounded-md p-1 bg-slate-800  border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700"
                        type="button"
                      >
                        tahrirlash
                      </button>

                      {/* Backdrop */}
                      {open && (
                        <div
                          onClick={() => setOpen(false)}
                          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
                        >
                          {/* Modal */}
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative m-4 p-4 w-2/5 min-w-[40%] max-w-[40%] rounded-lg bg-white shadow-sm"
                          >
                            {/* Header */}
                            <div className="flex items-center pb-4 text-xl font-medium text-slate-800">
                              Edit Your Review
                            </div>

                            {/* Body */}
                            <div className="border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
                              Rating:
                              <StarRating
                                hoverRating={hoverRating}
                                hoverHandler={hoverHandler}
                                rating={rating}
                                ratingHandler={ratingHandler}
                              />
                              <label htmlFor="comment">Comment: </label>
                              <textarea
                                className="border border-gray-300 p-2 rounded-md w-full"
                                rows="4"
                                placeholder="Type your message here..."
                                value={message}
                                onChange={messageHandler}
                              ></textarea>
                            </div>

                            {/* Footer */}
                            <div className="flex flex-wrap items-center pt-4 justify-end">
                              <button
                                onClick={() => setOpen(false)}
                                className="rounded-md py-2 px-4 text-sm text-slate-600 hover:bg-slate-100"
                                type="button"
                              >
                                Cancel
                              </button>

                              <button
                                onClick={() => {
                                  setOpen(false)
                                  deleteYourReview(review.id)
                                  
                                }}
                                className="rounded-md py-2 px-4 text-sm text-slate-600 hover:bg-red-500 hover:text-white"
                                type="button"
                              >
                                Delete
                              </button>

                              <button
                                onClick={() => {
                                  setOpen(false);
                                  editYourReview(review.id)
                                  setRestart(prev => !prev)
                                }}
                                className="rounded-md bg-green-600 py-2 px-4 text-sm text-white shadow-md hover:bg-green-700 ml-2"
                                type="button"
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      </>
                    )}
                  </div>
                </div>
                {review.replys &&
                  review.replys.length > 0 &&
                  review.replys.map((reply) => (
                    <div
                      key={reply.id}
                      className="sub-review-item bg-white px-10 pt-[32px] border-t"
                    >
                      <div className="review-author  mb-3">
                        <div className="flex space-x-3 items-center">
                          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                            <img
                              src={`${
                                import.meta.env.VITE_PUBLIC_URL
                              }/assets/images/review-user-2.png`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-[18px] font-medium text-qblack">
                              {reply.author}
                            </p>
                            <p className="text-[13px] font-normal text-qgray">
                              London,UK
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="review mb-[30px]">
                        <p className="text-[15px] text-qgray leading-7 text-normal">
                          {reply.reviews}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
        </div>
        {/* load reviews */}
        <div className="w-full flex justify-center">
          <button
            type="button"
            className="black-btn w-[300px] h-[50px] text-sm font-semibold"
          >
            Load More
          </button>
        </div>
      </div>
      <div className="write-review w-full">
        <h1 className="text-2xl font-medium text-qblack mb-5">
          Write Your Reviews
        </h1>

        <div className="flex space-x-1 items-center mb-[30px]">
          <StarRating
            hoverRating={hoverRating}
            hoverHandler={hoverHandler}
            rating={rating}
            ratingHandler={ratingHandler}
          />
          <span className="text-qblack text-[15px] font-normal mt-1">
            ({rating}.0)
          </span>
        </div>

        <div className="w-full review-form ">
          <div className="sm:flex sm:space-x-[30px] items-center mb-5">
          </div>
          <div className="w-full mb-[30px]">
            <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">
              Message*
            </h6>
            <textarea
              value={message}
              onChange={messageHandler}
              name=""
              id=""
              cols="30"
              rows="3"
              className="w-full focus:ring-0 focus:outline-none p-6"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              onClick={reviewAction}
              type="button"
              className="black-btn w-[300px] h-[50px]  flex justify-center"
            >
              <span className="flex space-x-1 items-center h-full">
                <span className="text-sm font-semibold">Submit Review</span>
                {reviewLoading && (
                  <span className="w-5 " style={{ transform: "scale(0.3)" }}>
                    <LoaderStyleOne />
                  </span>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
