const movie = {
  title: "Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train",
  synopsis:
    "Tanjiro Kamado, joined with Inosuke Hashibira, a boy raised by boars who wears a boar's head, and Zenitsu Agatsuma, a scared boy who reveals his true power when he sleeps, boards the Infinity Train on a new mission with the Fire Hashira, Kyojuro Rengoku, to defeat a demon who has been tormenting the people and killing the demon slayers who oppose it!",
  imgUrl: "https://image.tmdb.org/t/p/original/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg",

  id: 1,
  rating: 4,
  category: { title: "Marketing", href: "#" },
  author: {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
};

export default function DetailMoviePage() {
  const rate = [movie.rating, 10 - movie.rating];
  // create array of length 4, fill with 0, map to svg
  return (
    <div className="flex h-screen">
      <div>
        <img src={movie.imgUrl} className="h-full object-cover" />
      </div>
      <div>
        {/* asdf */}
        <div className="w-full">
          <div>
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6">
              <div className="lg:col-span-2 lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {movie.title}
                </h1>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <div className="flex items-center gap-x-4 text-xs my-3">
                    <a className="relative z-10 rounded-full bg-gray-200 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      Adventure
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="sr-only">Synopsis</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">{movie.synopsis}</p>
                  </div>
                </div>

                <div>
                  <div className="my-6">
                    <h3 className="text-sm font-medium text-gray-900 py-2">
                      Reviews
                    </h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {Array.from({ length: rate[0] }, (x) => x)
                          .map((r) => (
                            <svg
                              className="text-gray-900 h-5 w-5 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                              key={r + "_positive_rating"}
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        {Array.from({ length: rate[1] }, (x) => x)
                          .map((r) => (
                            <svg
                              className="text-gray-200 h-5 w-5 flex-shrink-0"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                              key={r + "_negative_rating"}
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                      </div>
                      <p className="sr-only">4 out of 5 stars</p>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Author
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      <li className="text-gray-400">
                        <span className="text-gray-600">
                          {movie.author.name}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* end of asdf */}
      </div>
    </div>
  );
}
