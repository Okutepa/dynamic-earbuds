(() => {

console.log("IIFE Fired");

  const sidebar = document.querySelector(".sidebar");
  const showSidebarButton = document.querySelector(".hideondesktop a");
  const hideSidebarButton = document.querySelector(".sidebar li:first-child a");
  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");
  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");
  const parentWidth = canvas.parentElement.offsetWidth;


  canvas.width = parentWidth;
  canvas.height = 1080;

  const buds = {
    frame: 0,
  };


  const frameCount = 300; //how many frames do we have

  const images = []; //array to hold all of our images

  const infoHotspot = [
    {
      slot: "hotspot-1",
      title: "Sweat &amp; Water Resistant",
      description:
        "The earbuds offer sweat and water resistance, ensuring durability for workouts and outdoor use.",
      imgSrc: "images/water-resistant.svg",
    },
    {
      slot: "hotspot-2",
      title: "Ergonomic Design",
      description:
        "Designed for comfort, these earbuds provide a secure and ergonomic fit for extended listening sessions.",
      imgSrc: "images/Ergonomic-design.svg",
    },
    {
      slot: "hotspot-3",
      title: "Noise Cancellation Technology",
      description:
        "Experience immersive sound with advanced noise-cancellation technology.",
      imgSrc: "images/noise-cancelling.svg",
    },
  ];

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/sequence/x-ray-${i}.png`;
    images.push(img);
  }

  gsap.to(buds, {
    frame: 299,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 1,
      markers: false,
      start: "top top",
    },
    onUpdate: render,
  });


  function showSidebar() {
    sidebar.classList.add("show");
  }
  
  function hideSidebar() {
    sidebar.classList.remove("show");
  }
  

  // Populate content dynamically
  function populateContent(hotspotDataItem, container) {
    container.innerHTML = `
            <img src="${hotspotDataItem.imgSrc}" alt="${hotspotDataItem.title}">
            <h2>${hotspotDataItem.title}</h2> 
            <p>${hotspotDataItem.description}</p> 
            
        `;
  }

  // Show info on hover
  function showInfo(e) {
    const slot = e.currentTarget.getAttribute("slot");
    const hotspotDataItem = infoHotspot.find((item) => item.slot === slot);

    if (hotspotDataItem) {
      const infoContainer = e.currentTarget.querySelector(".HotspotAnnotation");
      populateContent(hotspotDataItem, infoContainer);
      gsap.to(infoContainer, { duration: 1, autoAlpha: 1 });
    }
  }

  // Hide info function
  function hideInfo(e) {
    const infoContainer = e.currentTarget.querySelector(".HotspotAnnotation");
    gsap.to(infoContainer, { duration: 1, autoAlpha: 0 });
  }

  function moveDivisor() {
    console.log(slider.value);
    divisor.style.width = slider.value + "%";
  }

  function render() {
    const image = images[buds.frame];
    
    // Clear the canvas before rendering
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ensure the image is loaded
    if (!image.complete) return;
  
    // Calculate the aspect ratios
    const imageAspectRatio = image.width / image.height;
    const canvasAspectRatio = canvas.width / canvas.height;
  
    let drawWidth, drawHeight, offsetX, offsetY;
  
    // Fit the image inside the canvas while maintaining aspect ratio
    if (imageAspectRatio > canvasAspectRatio) {
      // Image is wider than canvas
      drawWidth = canvas.width;
      drawHeight = canvas.width / imageAspectRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2; // Center vertically
    } else {
      // Image is taller than canvas
      drawHeight = canvas.height;
      drawWidth = canvas.height * imageAspectRatio;
      offsetX = (canvas.width - drawWidth) / 2; // Center horizontally
      offsetY = 0;
    }
  
    // Draw the image
    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  }
  const hotspots = document.querySelectorAll(".Hotspot");
  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });

  showSidebarButton.addEventListener("click", showSidebar);
  hideSidebarButton.addEventListener("click", hideSidebar);
  slider.addEventListener("input", moveDivisor);
  images[0].addEventListener("load", render);
})();
