import React from 'react'

export const Reviews = ({avgRating,reviews}) => {


  return (
     <div className="mt-4">
                  <p className="font-semibold">Average Rating: {avgRating} ⭐</p>
                 
                  {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet</p>
                  ) : (
                    reviews.map((r) => (
                      <div key={r._id} className="border-t py-2">
                        <p className="font-semibold">Username :{r.userId.username}</p>
                        <p>Rating: {r.star} ⭐</p>
                        <p>Comment: {r.comments}</p>
                      </div>
                    ))
                  )}
                </div>
  )
}
