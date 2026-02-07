import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Upload } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const PLACEHOLDER_PHOTOS = [
  { id: 1, url: '/photos/photo1.jpg', caption: 'Our first date - unforgettable', date: 'August 2024' },
  { id: 2, url: '/photos/photo2.jpg', caption: 'That smile that melts my heart', date: 'September 2024' },
  { id: 3, url: '/photos/photo3.jpg', caption: 'Adventures together', date: 'October 2024' },
  { id: 4, url: '/photos/photo4.jpg', caption: 'Just us being us', date: 'November 2024' },
  { id: 5, url: '/photos/photo5.jpg', caption: 'Making memories', date: 'December 2024' },
  { id: 6, url: '/photos/photo6.jpg', caption: 'Forever my favorite', date: 'January 2026' }
];

function Gallery({ photos: photosProp = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const photos = (photosProp && photosProp.length > 0) ? photosProp : PLACEHOLDER_PHOTOS;
  const allPhotos = [...photos, ...uploadedPhotos];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhotos(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: reader.result,
          caption: 'A precious memory',
          date: new Date().toLocaleDateString()
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="gallery-page">
      <motion.div
        className="gallery-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Camera className="gallery-icon" size={40} />
        <h1 className="gallery-title">Our Beautiful Moments</h1>
        <p className="gallery-subtitle">Every picture tells our story</p>
      </motion.div>


      <motion.div
        className="carousel-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 80,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="photo-swiper"
        >
          {allPhotos.map((photo, index) => (
            <SwiperSlide key={photo.id}>
              <motion.div
                className="photo-card"
                onClick={() => setSelectedImage(photo)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="photo-placeholder"
                  style={{
                    backgroundImage: `url(${photo.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="photo-overlay">
                    <p className="photo-caption">{photo.caption}</p>
                    <p className="photo-date">{photo.date}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
              >
                <X size={30} />
              </button>
              
              <img src={selectedImage.url} alt={selectedImage.caption} />
              
              <div className="lightbox-info">
                <h3>{selectedImage.caption}</h3>
                <p>{selectedImage.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="gallery-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="grid-container">
          {allPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="grid-item"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => setSelectedImage(photo)}
            >
              <div 
                className="grid-photo"
                style={{
                  backgroundImage: `url(${photo.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="grid-overlay">
                <p className="grid-caption">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Gallery;
