import { MoveRight } from 'lucide-react';
import { memo } from 'react';

const Footer = memo(() => {
    return (
        <>
            <footer className='grid grid-cols-2 gap-0.5 border-2 border-black text-white max-480:grid-cols-1 min-481-max-834:grid-cols-1'>
                <div className='email-inp bg-black flex flex-col justify-center items-center max-480:py-16 max-480:items-start max-480:px-4 min-481-max-834:py-16 min-835:py-16'>
                    <h2 className='w-10/12 py-5 font-medium max-480:py-0 max-480:pb-8 min-481-max-834:py-0 min-481-max-834:pb-8 min-835:py-0 min-835:pb-8'>
                        SIGN UP TO NEWSLETTER
                    </h2>
                    <div className='flex w-10/12 max-480:w-full max-480:flex-col'>
                        <input
                            type='email'
                            placeholder='Your email address'
                            className='h-10 bg-black border border-white pl-5 w-96 max-480:w-full max-480:mb-2 min-481-max-834:w-10/12'
                        />
                        <button type='button' className='bg-white text-black h-10 w-28 max-480:w-full min-481-max-834:w-1/4 flex justify-center items-center'>
                        <MoveRight size={30} />
                        </button>
                    </div>
                </div>
                <div className='reseaux-so bg-black flex justify-between items-center px-20 max-480:flex-col max-480:text-center max-480:px-4 max-480:py-16 min-481-max-834:py-16 min-835:py-16 min-835:px-12'>
                    <div className='max-480:mb-4'>
                        <h3 className='font-medium py-4 max-480:pt-0 min-481-max-834:pt-0 min-835:pt-0'>BUYERS</h3>
                        <div>
                            <p>Certificates</p>
                            <p>Table of sizes</p>
                            <p>Shipping</p>
                        </div>
                    </div>
                    <div className='max-480:mb-4'>
                        <h3 className='font-medium py-4 min-481-max-834:pt-0 min-835:pt-0'>COMPANY</h3>
                        <div>
                            <p>About</p>
                            <p>Lookbook</p>
                            <p>Contact</p>
                        </div>
                    </div>
                    <div>
                        <h3 className='font-medium py-4 min-481-max-834:pt-0 min-835:pt-0'>FOLLOW US</h3>
                        <div>
                            <p><a href="https://www.instagram.com/" target='_blank' rel='noopener noreferrer'>Instagram</a></p>
                            <p><a href="https://web.facebook.com/" target='_blank' rel='noopener noreferrer'>Facebook</a></p>
                            <p><a href="https://vk.com/" target='_blank' rel='noopener noreferrer'>VKontakte</a></p>
                        </div>
                    </div>
                </div>
            </footer>
            <div className='max480:bg-white col-span-2 text-center min-481-max-834:bg-black min-481-max-834:text-white min-481-max-834:border-t-2 min-481-max-834:border-white min-835:bg-black min-835:text-white min-835:border-t-2 min-835:border-white'>
                <h1>© 2020 CATSSTAC</h1>
            </div>
        </>
    );
});

export default Footer;
