import { v4 as uuid } from 'uuid';
const bubbles = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      random: true,
      speed: 1,
      direction: 'top',
      out_mode: 'out',
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
      onclick: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0,
      },
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
};

const simple = {
  particles: {
    number: {
      value: 100,
    },
    size: {
      value: 3,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
    },
  },
};

const snow = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false,
      },
    },
    size: {
      value: 10,
      random: true,
    },
    move: {
      direction: 'bottom',
      out_mode: 'out',
    },
    line_linked: {
      enable: false,
    },
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: 'remove',
      },
    },
    modes: {
      remove: {
        particles_nb: 10,
      },
    },
  },
};

const nightSky = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 1500,
      },
    },
    line_linked: {
      enable: true,
      opacity: 0.02,
    },
    move: {
      direction: 'right',
      speed: 0.05,
    },
    size: {
      value: 1,
    },
    opacity: {
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.05,
      },
    },
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: 'push',
      },
    },
    modes: {
      push: {
        particles_nb: 1,
      },
    },
  },
  retina_detect: true,
};

const particlesJsParams = {
  simple,
  bubbles,
  snow,
  nightSky,
};

const arrayOfParticleJsConfigObjects = Object.keys(particlesJsParams).map(
  (particle) => ({
    id: uuid(),
    name: particle,
    params: particlesJsParams[particle],
  })
);

export default arrayOfParticleJsConfigObjects;
