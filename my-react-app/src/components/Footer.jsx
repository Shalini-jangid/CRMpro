import crmLogo from '../assets/crm-logo.png';

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 bg-emerald-700 rounded-lg flex items-center justify-center">
                  <img src={crmLogo} alt="Logo" className="w-8" />
                </div>
                <span className="text-xl font-bold">CRMPro</span>
              </div>
              <p className="text-gray-400 mb-6">
                Empowering businesses with intelligent customer relationship management solutions.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer">
                  <span className="font-bold">f</span>
                </div>
                <div className="w-10  bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer">
                  <span className="font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors cursor-pointer">
                  <span className="font-bold">in</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/feature" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
   
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">About</a></li>

                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/contact" className="hover:text-white transition-colors">FAQ</a></li>
          
                <li><a href="/contact" className="hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 CRMPro. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
           
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
