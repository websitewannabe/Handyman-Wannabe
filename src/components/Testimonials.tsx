import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Excellent service! The handyman was professional, on time, and did a fantastic job with our kitchen cabinet repairs.",
    image: "public/images/sarah-Johnson.jpeg",
    role: "Homeowner",
  },
  {
    name: "Michael Chen",
    rating: 5,
    text: "Very reliable and skilled. Fixed our deck issues quickly and efficiently. Highly recommend!",
    image: "public/images/michael-Chen.avif",
    role: "Business Owner",
  },
  {
    name: "Emily Rodriguez",
    rating: 5,
    text: "Outstanding attention to detail on our bathroom renovation. The team was courteous and professional throughout.",
    image: "public/images/emily-Rodriguez.avif",
    role: "Interior Designer",
  },
  {
    name: "David Thompson",
    rating: 5,
    text: "From start to finish, the experience was fantastic. They helped transform our outdated kitchen into a modern masterpiece.",
    image: "public/images/david_Thompson.avif",
    role: "Real Estate Agent",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = testimonials.length - 1;
      if (newIndex >= testimonials.length) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <section className="relative py-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("public/images/construction-Worker.avif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(240, 90, 39, 0.9)" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            className="absolute -left-16 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 z-10"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute -right-16 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 z-10"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="h-[400px] overflow-hidden relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 rounded-full mb-6 object-cover border-4 border-white shadow-lg"
                    />
                    <div className="flex mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-6 h-6 text-yellow-400 fill-current"
                          />
                        ),
                      )}
                    </div>
                    <p className="text-xl text-gray-600 italic mb-6">
                      "{testimonials[currentIndex].text}"
                    </p>
                    <h3 className="text-2xl font-bold mb-1">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-primary font-medium">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const direction = index > currentIndex ? 1 : -1;
                    setDirection(direction);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
