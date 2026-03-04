import React from 'react'

const Footer = () => {
  return (
    <div className='relative text-white overflow-hidden' 
         style={{
           backgroundImage: 'url(/images/footer/footer.jpeg)',
           backgroundSize: '100% 100%',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           backgroundAttachment: 'fixed',
           width: '100vw',
           marginLeft: 'calc(-50vw + 50%)',
           marginRight: 'calc(-50vw + 50%)'
         }}>
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative z-10">
        <footer className="footer footer-center p-4">
          <aside>
            <p>Copyright {new Date().getFullYear()} - All right reserved by Mac Company Ltd</p>
          </aside>
        </footer>
      </div>
    </div>
  )
}

export default Footer