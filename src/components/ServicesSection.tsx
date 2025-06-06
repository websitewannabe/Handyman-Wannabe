{/* Third Party Moving Card */}
            <motion.div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              variants={cardVariants}
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <Home className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Third Party Moving</h3>
                <p className="text-gray-600 mb-6">
                  Professional moving services for your home or business including
                  packing, loading, and transportation.
                </p>
                <a
                  href="/third-party-moving"
                  className="flex items-center text-primary font-semibold"
                >
                  Learn More
                  <ChevronRight className="w-5 h-5 ml-1" />
                </a>
              </div>
            </motion.div>