(() => {

console.log("IIFE Fired");

  const sidebar = document.querySelector(".sidebar");
  const showSidebarButton = document.querySelector(".hideondesktop a");
  const hideSidebarButton = document.querySelector(".sidebar li:first-child a");
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

  const hotspots = document.querySelectorAll(".Hotspot");
  hotspots.forEach((hotspot) => {
    hotspot.addEventListener("mouseover", showInfo);
    hotspot.addEventListener("mouseout", hideInfo);
  });

  showSidebarButton.addEventListener("click", showSidebar);
  hideSidebarButton.addEventListener("click", hideSidebar);
})();
