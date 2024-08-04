
export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-5 mt-3">
                <div className="lg:w-2/3 mx-auto">
                    <h1 className="text-6xl text-left font-bold mb-4 pt-32">Contact Me</h1>
                    <hr className="border-t-2 border-white my-4" />
                </div>
                <div className="mx-auto items-center w-full text-2xl text-center">
                    <p>Let's get in touch soon</p>
                </div>

                <div className="w-full lg:w-1/2 px-0 flex items-center mx-auto p-6">
                    <form
                        action="https://formsubmit.co/cloudsleeper03@icloud.com"
                        method="POST"
                        className="w-full"
                    >
                        <div className="flex flex-wrap -mx-2 mb-4">
                            <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input
                                    className="form-input w-full border rounded-none px-3 py-2 text-white bg-black"
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="w-full lg:w-1/2 px-2">
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    className="form-input w-full border rounded-none px-3 py-2 text-white bg-black"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    required
                                />
                            </div>
                        </div>
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea
                            className="form-textarea w-full border rounded-none px-3 py-2 mb-4 text-white bg-black"
                            id="message"
                            name="message"
                            placeholder="Message"
                            rows="5"
                            required
                        ></textarea>
                        <button
                            className="bg-white text-black py-2 px-4 rounded hover:bg-yellow-400"
                            type="submit"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}