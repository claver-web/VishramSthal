export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 text-center transition-colors duration-300 mt-auto">
      <div className="container mx-auto px-4">
        <p className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Vishram Sthal</p>
        <p className="text-gray-600 dark:text-gray-300">Word No. 6, Dehra Gopipur, Himachal Pradesh</p>
        <p className="text-gray-600 dark:text-gray-300">Phone: +91 9876543210</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="text-orange-500 hover:text-orange-600 transition">Facebook</a>
          <a href="#" className="text-orange-500 hover:text-orange-600 transition">Instagram</a>
          <a href="#" className="text-orange-500 hover:text-orange-600 transition">Twitter</a>
        </div>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Vishram Sthal. All rights reserved.</p>
      </div>
    </footer>
  );
}
