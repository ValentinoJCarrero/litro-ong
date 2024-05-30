export const preloadData = {
  VolunteerData: {
    availableDays: ['lunes', 'martes'],
    startHours: '13:00',
    endHours: '20:00',
    description:
      'No tengo movilidad propia y soy alergico a las flores. Ademas tengo miedo a las alturas y soy no binario. Cuando llueve no me dejan salir. si un lunes o martes es feriado, no puedo. tengo fulbo',
  },
  users: [
    {
      fullName: 'Admin',
      email: 'admin@admin.com',
      password: 'Administrador1',
      fullAddress: 'alemania 123',
      phone: '23123123',
      dni: '123123123',
      birthDate: '2005-02-17',
      isSubscribed: true,
      role: [],
    },
    {
      fullName: 'Volunteer',
      email: 'volunteer@volunteer.com',
      password: 'Voluntario1',
      fullAddress: 'adrogue 123',
      phone: '23123123',
      dni: '123123123',
      birthDate: '2005-02-17',
      isSubscribed: true,
      role: [],
      volunteerData: undefined,
    },
    {
      fullName: "Partner",
      email: 'partner@partner.com',
      password: 'Partner1',
      fullAddress: 'rosario 123',
      phone: '23123123',
      dni: '123123123',
      birthDate: '2005-02-17',
      isSubscribed: true,
      role: []
    }
  ],
  Workshops: [
    {
      name: 'Curso de Scrum Master - Liderazgo Ágil',
      teacher: 'Santiago Martínez',
      teacherPhone: '123546789',
      photo:
        'https://miro.medium.com/v2/resize:fit:660/1*75T2N4LpTImYJlBXHcrCfw.png',
      timeStart: '10:00',
      duration: '02:00',
      dateStart: '2024-04-07',
      cost: '1500.00',
      days: ['Lunes', 'Viernes'],
      description:
        'Sumérgete en el mundo del desarrollo ágil y conviértete en un líder efectivo de equipos de trabajo con nuestro curso de Scrum Master, impartido por el experimentado Santiago Martínez. En este curso, aprenderás los principios fundamentales de Scrum, cómo implementarlos en proyectos reales y cómo liderar equipos de manera efectiva para lograr resultados sobresalientes. Santiago te guiará a través de técnicas probadas y te brindará las herramientas necesarias para enfrentar los desafíos del mundo empresarial actual. ¡Únete a nosotros y conviértete en un Scrum Master altamente capacitado y en demanda!',
    },

    {
      name: 'Jardineria',
      teacher: 'Julian Magallanes',
      teacherPhone: '12341239',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716849867/jardineria_pxjewx.jpg',
      timeStart: '17:00',
      duration: '00:45',
      dateStart: '2024-05-03',
      dateEnd: '2024-08-12',
      cost: '500.00',
      days: ['Martes'],
      description:
        '¡Sumérgete en el mundo de la jardinería con nuestro taller dirigido por el experto Julian Magallanes! Aprende todo sobre el cuidado de plantas, diseño de jardines y técnicas de jardinería sostenible. Este curso es perfecto para principiantes y entusiastas de la jardinería por igual. Las clases se llevarán a cabo los martes de 17:00 a 17:45, y el curso se extenderá desde el 3 de mayo hasta el 12 de agosto. ¡No te pierdas esta oportunidad de cultivar tus habilidades en el hermoso arte de la jardinería!',
    },
    {
      name: 'Taekwon-Do',
      teacher: 'Miguel Tapia',
      teacherPhone: '123456879',
      photo:
        'https://mastkd.com/wp-content/uploads/2022/04/the-studio-shot-of-group-of-kids-training-karate-m-2021-08-26-17-41-52-utc-scaled.jpg',
      timeStart: '17:00',
      duration: '1:30',
      dateStart: '2024-02-10',
      cost: '600.00',
      days: ['Lunes', 'Viernes'],
      description:
        '¡Embárcate en un emocionante viaje hacia el mundo del Taekwon-Do con nuestro curso dirigido por el experimentado instructor Miguel Tapia! Este curso está diseñado para todas las edades y niveles de experiencia, desde principiantes hasta avanzados. No importa si nunca has practicado Taekwon-Do antes, ¡este curso es perfecto para ti! Las clases se llevarán a cabo los lunes y viernes de 17:00 a 18:30, y puedes incorporarte en cualquier momento, ya que las clases están diseñadas para adaptarse a tu nivel. Aprenderás técnicas de defensa personal, formas tradicionales, y mucho más, todo mientras mejoras tu condición física y tu confianza. ¡No te pierdas esta oportunidad de aprender un arte marcial fascinante en un ambiente divertido y acogedor!',
    },
    {
      name: 'Musica',
      teacher: 'Simon Flores',
      teacherPhone: '123456789',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716849864/MUSICA_fwlfyw.webp',
      timeStart: '10:00',
      duration: '1:00',
      dateStart: '2024-03-03',
      cost: '800.00',
      days: ['Lunes', 'Miercoles', 'Viernes'],
      description:
        '¡Descubre el maravilloso mundo de la música en nuestro taller con el talentoso profesor Simon Flores! En este curso, aprenderás los fundamentos de la teoría musical, técnicas de interpretación y mucho más. No se requiere experiencia previa, ¡solo las ganas de aprender y disfrutar de la música! Las clases se llevarán a cabo los lunes, miércoles y viernes, de 10:00 a 11:00. ¡No te pierdas esta oportunidad única de sumergirte en el apasionante universo de la música!',
    },
    {
      name: 'Costura y Confección',
      teacher: 'Valentino Carrero',
      teacherPhone: '124356789',
      photo:
        'https://audaces.com/wp-content/uploads/2021/04/historia-da-costura-2-1536x1024-1.jpg',
      timeStart: '09:00',
      duration: '1:00',
      cost: '500.00',
      days: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
      description:
        'Sumérgete en el mundo de la costura y la confección con nuestro curso impartido por el talentoso instructor Valentino Carrero. Este curso es perfecto para aquellos que desean aprender desde los conceptos básicos hasta técnicas avanzadas de costura y diseño de moda. Las clases se llevarán a cabo de lunes a viernes, de 09:00 a 10:00, lo que te brinda la flexibilidad de ajustar tu horario según tus necesidades. No importa si eres un principiante completo o si ya tienes experiencia en costura, este curso está diseñado para adaptarse a todos los niveles. Aprenderás a usar una máquina de coser, a tomar medidas, a cortar patrones y a crear tus propias prendas únicas. ¡Únete a nosotros y desata tu creatividad en el fascinante mundo de la costura y la confección!',
    },
    {
      name: 'Taller de Danzas Árabes: Descubre la Belleza y Elegancia de la Danza Oriental',
      teacher: 'Nicolas Addamo',
      teacherPhone: '123465789',
      photo: 'https://i.ytimg.com/vi/N7-WNR6N8-4/maxresdefault.jpg',
      timeStart: '10:00',
      duration: '1:00',
      dateEnd: '2024-12-12',
      cost: '100.00',
      days: ['Viernes', 'Domingo'],
      description:
        'Sumérgete en el fascinante mundo de las danzas árabes con nuestro taller dirigido por el talentoso Nicolas Addamo. En este curso, explorarás la rica historia y los movimientos cautivadores de la danza oriental. Aprenderás pasos básicos, técnicas de expresión corporal y coreografías emocionantes que te permitirán conectarte con la música y expresarte a través del arte de la danza. No se requiere experiencia previa, ¡solo ven con tu pasión y disposición para aprender! Únete a nosotros en esta aventura cultural y descubre la belleza y elegancia de las danzas árabes.',
    },
    {
      name: 'Creación de Currículums Vitae Efectivos',
      teacher: 'Luca Di Fulvio',
      teacherPhone: '123456789',
      photo: 'https://static.educaweb.com/img/news/Elementos%20CV.jpg',
      timeStart: '16:00',
      duration: '1:30',
      cost: '00.00',
      days: ['Martes', 'Viernes'],
      description:
        'Sumérgete en el mundo de la creación de currículums vitae efectivos con nuestro taller dirigido por el experto Luca Di Fulvio. En este curso, aprenderás las mejores técnicas para crear un currículum vitae que destaque tus habilidades y experiencia de manera efectiva. Luca te guiará a través de cada paso, desde la estructuración adecuada hasta la elección de palabras clave y la presentación visual. Ya sea que estés buscando tu primer trabajo o quieras mejorar tu currículum actual, este taller te brindará las herramientas necesarias para destacarte en el mercado laboral. ¡Únete a nosotros y da un paso más cerca hacia tu próximo éxito profesional!',
    },
  ],
  events: [
    {
      title: 'Recital benéfico: Música para ayudar',
      subtitle:
        'Únete a nosotros para apoyar a niños en situación de vulnerabilidad',
      address: 'Plaza Central, Calle Principal',
      date: '2024-06-15',
      timeStart: '18:00',
      timeEnd: '22:00',
      description:
        'Te invitamos a nuestro recital benéfico "Música para ayudar", donde destacados artistas locales brindarán un espectáculo único. Los fondos recaudados se destinarán a programas de ayuda para niños desfavorecidos de nuestra comunidad. Únete a nosotros para disfrutar de una noche de música y solidaridad.',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853621/5b867116-6825-4b99-b45a-7cfa37897cb9.png',
      secondaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853572/4fc47bb6-b1e3-43f7-97a9-5a90bb33c53f.png',
    },
    {
      title: 'Jornada de limpieza: Por un entorno más limpio y saludable',
      subtitle: 'Ayúdanos a mantener limpios nuestros parques',
      address: 'Parque Central, Calle Principal',
      date: '2024-06-22',
      timeStart: '09:00',
      timeEnd: '12:00',
      description:
        'Participa en nuestra jornada de limpieza en parques públicos, donde juntos trabajaremos para mantener limpios y saludables nuestros espacios verdes. Trae tu entusiasmo y ganas de colaborar por un entorno más limpio y sostenible para todos. Durante la jornada, nos enfocaremos en la recolección de residuos y la limpieza de áreas específicas del parque, con el objetivo de promover la conciencia ambiental y el cuidado de nuestro entorno. Además de contribuir a la limpieza, tendrás la oportunidad de conocer a otros miembros de la comunidad y disfrutar de un ambiente ameno y colaborativo. Al finalizar la jornada, se entregará a cada participante un pin insignia como reconocimiento por su valiosa contribución y compromiso con la conservación de nuestro entorno. ¡Únete a nosotros y marca la diferencia en la conservación de nuestro entorno para las futuras generaciones!',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853572/4fc47bb6-b1e3-43f7-97a9-5a90bb33c53f.png',
      secondaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853646/2bb63bad-a5a9-4f66-b7e1-23d459c05f2d.png',
    },
    {
      title: 'Feria de emprendedores: Apoyando el talento local',
      subtitle:
        'Descubre los productos y servicios de emprendedores de nuestra comunidad',
      address: 'Plaza Principal, Calle Central',
      date: '2024-07-05',
      timeStart: '10:00',
      timeEnd: '16:00',
      description:
        'Te invitamos a nuestra feria de emprendedores, donde podrás descubrir y apoyar el talento local. Conoce los productos y servicios ofrecidos por emprendedores de nuestra comunidad y contribuye al desarrollo económico de nuestra región. Descubre nuevas ideas y proyectos innovadores que están surgiendo en nuestra comunidad y sé parte de esta experiencia única. Además, disfruta de actividades culturales y gastronómicas que acompañarán esta jornada llena de creatividad y emprendimiento',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853691/69248049-0943-41e0-a5be-d815c4375d17.png',
    },
    {
      title: 'Charla ambiental: Cuidando nuestro planeta',
      subtitle:
        'Aprende cómo contribuir al cuidado del medio ambiente desde casa',
      address: 'Centro Comunitario, Calle de la Naturaleza',
      date: '2024-07-12',
      timeStart: '18:30',
      timeEnd: '20:00',
      description:
        'Participa en nuestra charla sobre el cuidado del medio ambiente, donde aprenderás consejos prácticos para contribuir al cuidado de nuestro planeta desde casa. Descubre cómo pequeñas acciones pueden marcar la diferencia en la protección de nuestro entorno.',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853646/2bb63bad-a5a9-4f66-b7e1-23d459c05f2d.png',
      secondaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853621/5b867116-6825-4b99-b45a-7cfa37897cb9.png',
    },
  ],
  news: [
    {
      title: 'Récord histórico en recaudación de alimentos para la comunidad',
      subtitle:
        'Este mes superamos todas las expectativas en recaudación de alimentos',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716702245/preload%20litro/noticia_ycmctu.jpg ',
      secondaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853572/4fc47bb6-b1e3-43f7-97a9-5a90bb33c53f.png',
      tertiaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853691/69248049-0943-41e0-a5be-d815c4375d17.png',
      description: `En un esfuerzo conjunto y con el apoyo de la comunidad, hemos logrado superar todos los récords de recaudación de alimentos este mes.
      La campaña, que se llevó a cabo durante las últimas cuatro semanas, contó con la colaboración de más de 20 voluntarios dedicados, que trabajaron incansablemente para recoger y distribuir donaciones a quienes más lo necesitan. 
      Gracias a la generosidad de nuestros vecinos y a la colaboración de empresas locales, hemos conseguido recolectar más de 2 toneladas de alimentos, un hito sin precedentes en la historia de nuestra organización. 
      Además de la recolección de alimentos, la campaña incluyó eventos comunitarios para concienciar sobre la importancia de la solidaridad y el apoyo mutuo en tiempos de crisis. 
      Estos eventos no solo ayudaron a aumentar las donaciones, sino que también fortalecieron los lazos comunitarios, demostrando una vez más el poder de la unidad en momentos difíciles. 
      Queremos agradecer profundamente a todos los que participaron en esta campaña, desde los voluntarios que dedicaron su tiempo y esfuerzo, hasta las empresas que ofrecieron su apoyo logístico y financiero. 
      Sin ustedes, este logro no habría sido posible. Seguimos comprometidos con nuestra misión de ayudar a quienes más lo necesitan, y esperamos continuar contando con su apoyo en futuras iniciativas. 
       ¡Gracias a todos por su invaluable contribución!`,
      date: '2023-10-20',
    },
    {
      title: 'Nuevos socios estratégicos se unen a nuestra causa',
      subtitle:
        'Colaboraciones que fortalecen nuestras iniciativas comunitarias',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716702245/preload%20litro/noticia_ycmctu.jpg ',
      secondaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853572/4fc47bb6-b1e3-43f7-97a9-5a90bb33c53f.png',
      description: `Nos complace anunciar que hemos firmado acuerdos con varios nuevos socios estratégicos que ayudarán a impulsar nuestras causas. Estas alianzas nos permitirán ampliar nuestros programas de asistencia, ofreciendo más recursos y apoyo a las personas que más lo necesitan. Entre los nuevos socios se encuentran empresas locales, fundaciones y entidades gubernamentales, todas comprometidas con el bienestar de nuestra comunidad. Esta colaboración es un paso significativo hacia la construcción de una red de apoyo más sólida y eficiente. Juntos, estamos convencidos de que podemos lograr un impacto aún mayor y cambiar la vida de muchas más personas. Agradecemos a nuestros nuevos socios por su confianza y compromiso con nuestra misión.`,
      date: '2023-11-25',
    },
    {
      title:
        'Talleres de empoderamiento para jóvenes: Construyendo futuros brillantes',
      subtitle: 'Capacitación y desarrollo personal para adolescentes',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716702245/preload%20litro/noticia_ycmctu.jpg',
      description: `En un esfuerzo por empoderar a la próxima generación, hemos lanzado una serie de talleres diseñados para jóvenes de 13 a 18 años. Estos talleres se centran en el desarrollo de habilidades personales y profesionales, incluyendo liderazgo, trabajo en equipo y habilidades de comunicación. Además, se abordan temas como la planificación de carrera y la educación financiera, proporcionando a los adolescentes herramientas valiosas para su futuro. Los talleres han tenido una excelente acogida, con más de 50 jóvenes participando activamente en las sesiones. Agradecemos a nuestros instructores y voluntarios por su dedicación y esfuerzo en la implementación de este programa.`,
      date: '2023-12-10',
    },
    {
      title: 'Campaña de donaciones de invierno: Abrigando corazones',
      subtitle: 'Recolectamos ropa y alimentos para enfrentar el frío',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716702245/preload%20litro/noticia_ycmctu.jpg',
      description: `Con la llegada del invierno, hemos lanzado nuestra campaña anual de donaciones para recolectar ropa abrigada y alimentos no perecederos. Esta iniciativa busca asegurar que las personas en situación de vulnerabilidad puedan enfrentar el frío de manera digna y segura. Gracias a la generosidad de nuestra comunidad, hemos recolectado cientos de abrigos, bufandas y guantes, además de una considerable cantidad de alimentos. La distribución de estas donaciones se realizará en varios puntos estratégicos de la ciudad durante las próximas semanas. Invitamos a todos a seguir participando y a contribuir con lo que puedan para hacer de este invierno una temporada más cálida y segura para todos.`,
      date: '2024-02-17',
    },
    {
      title: 'Celebración del Día del Voluntariado: Homenaje a nuestros héroes',
      subtitle: 'Reconociendo el invaluable aporte de nuestros voluntarios',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853691/69248049-0943-41e0-a5be-d815c4375d17.png',
      secondaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853646/2bb63bad-a5a9-4f66-b7e1-23d459c05f2d.png',
      description: `El pasado fin de semana celebramos el Día del Voluntariado, una ocasión especial para reconocer y agradecer el trabajo incansable de nuestros voluntarios. Estos héroes cotidianos dedican su tiempo y esfuerzo para ayudar a los más necesitados, y su compromiso es fundamental para el éxito de nuestras iniciativas. Durante la celebración, se entregaron reconocimientos a los voluntarios más destacados y se compartieron historias inspiradoras sobre el impacto de su labor. El evento también fue una oportunidad para fortalecer los lazos entre los voluntarios y fomentar un espíritu de camaradería y colaboración. A todos nuestros voluntarios, ¡gracias por su dedicación y por hacer de nuestra comunidad un lugar mejor!`,
      date: '2024-05-17',
    },
    {
      title:
        'Nueva colecta programada: ¡Únete a nosotros este sábado para apoyar a quienes más lo necesitan!',
      subtitle: 'Colabora con nuestra causa y marca la diferencia',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853646/2bb63bad-a5a9-4f66-b7e1-23d459c05f2d.png',
      description: `Te invitamos a participar en nuestra próxima colecta de alimentos y artículos de primera necesidad, programada para este sábado en la plaza principal. Esta es una oportunidad para unirte a nuestra causa y contribuir con aquellos que más lo necesitan en nuestra comunidad. Tu generosidad puede marcar una gran diferencia en la vida de muchas personas. No importa cuánto puedas donar, cada granito de arena cuenta. ¡Esperamos verte allí y compartir juntos este acto de solidaridad y generosidad!`,
      date: '2024-05-17',
    },
    {
      title:
        'Actividad recreativa en la plaza principal: Diversión para toda la familia',
      subtitle: 'Una jornada llena de juegos, risas y momentos inolvidables',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716702245/preload%20litro/noticia_ycmctu.jpg',
      secondaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853621/5b867116-6825-4b99-b45a-7cfa37897cb9.png',
      tertiaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716853621/5b867116-6825-4b99-b45a-7cfa37897cb9.png',
      description: `Este sábado, te invitamos a participar en una emocionante actividad recreativa en la plaza principal. Habrá juegos, actividades artísticas, música en vivo y muchas sorpresas más. Esta es una oportunidad para que las familias se unan, disfruten de un día al aire libre y creen recuerdos inolvidables juntos. La entrada es gratuita y todos están invitados. ¡Ven y únete a nosotros para una jornada llena de diversión y alegría para toda la familia!.
      Además de las actividades mencionadas, contaremos con puestos de comida local y artesanías, donde podrás disfrutar de deliciosas opciones gastronómicas y apoyar a los emprendedores de nuestra comunidad. También tendremos espacios de relajación y áreas de juego para los más pequeños, asegurando que todos los miembros de la familia tengan una experiencia memorable. ¡No te pierdas esta oportunidad de disfrutar de un día único en compañía de tus seres queridos y de nuestra comunidad!`,
      date: '2024-05-17',
    },
    {
      title:
        'Sorteo de agradecimiento para socios: Premiando su compromiso con EL Litro',
      subtitle: 'Una oportunidad para agradecer a nuestros socios por su apoyo',
      primaryImage:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716702245/preload%20litro/noticia_ycmctu.jpg',
      description: `Como muestra de agradecimiento a nuestros socios por su continuo apoyo, estamos organizando un emocionante sorteo con increíbles premios. Los socios que hayan contribuido durante este año tendrán la oportunidad de ganar premios como estadías en hoteles, cenas en restaurantes locales y experiencias únicas. Este sorteo es nuestra manera de reconocer y recompensar el compromiso y la generosidad de nuestros socios, cuyo apoyo es fundamental para el trabajo que realizamos. ¡Agradecemos a todos nuestros socios por ser parte de nuestra familia y por hacer posible nuestra labor!`,
      date: '2024-05-17',
    },
  ],
  roles: [{ role: 'Admin' }, { role: 'Volunteer' }, { role: 'Partner' }],
  sponsors: [
    {
      name: 'Evi Desarrollos',
      email: 'evi@evi.com',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/evi_twk6uk.png ',
    },
    {
      name: 'COSAG',
      email: 'cosag@cosag.com',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/COSAG_cvlfgc.png ',
    },
    {
      name: 'Supermercados Becerra',
      email: 'becerra@becerra.com',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701926/preload%20litro/becerra_zzkhoh.png ',
    },
    {
      name: 'Jalisco Heladería',
      email: 'jalisco@jalisco.com',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701937/preload%20litro/JALISCO_jbmx3x.png ',
    },
    {
      name: 'Alsina Farmacia',
      email: 'alsina@alsina.com',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/farmacia_rdvpq1.png ',
    },
    {
      name: 'Sponsor prueba 1',
      email: 'prueba1@prueba1.com',
      logo: 'https://c0.klipartz.com/pngpicture/532/860/gratis-png-iconos-de-la-computadora-internet-hipervinculo-navegador-web-world-wide-web-thumbnail.png',
    },
    {
      name: 'sponsor prueba 2',
      email: 'prueba2@prueba2.com',
      logo: 'https://w7.pngwing.com/pngs/383/404/png-transparent-computer-icons-hyperlink-polaris-learning-ltd-links-miscellaneous-blue-text.png',
    },
  ],
  benefits: [
    {
      name: 'Panchetos HOT DOG',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/evi_twk6uk.png ',
      address: 'Liniers 196',
      benefits: '2x1 en panchos',
      description: 'lunes a jueves',
    },
    {
      name: 'La serranita - Parque recreativo',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/evi_twk6uk.png ',
      address: 'Ruta 5, km 8.5',
      benefits: 'Tres 2x1 por tarjeta',
      description: 'viernes, sabados y domingos',
    },
    {
      name: 'M-A-E BEBIDAS',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/evi_twk6uk.png ',
      address: 'Av. Dalinger 148',
      benefits: '10% de descuento',
      description: 'Lunes, Martes y Miercoles',
    },
    {
      name: 'VAQUERIA',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/evi_twk6uk.png ',
      address: 'Av. Belgrano 196',
      benefits: '10% de descuento',
      description: 'Todos los Miercoles solo debito y contado',
    },
    {
      name: 'Lavadero de autos',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/evi_twk6uk.png ',
      address: 'Malvinas Argentinas 123',
      benefits: 'Lavado a $1500',
      benefitEndDate: '2024-08-15',
      description: 'Descuento aplicable una vez por mes',
    },
    {
      name: 'AC FITNESS',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/evi_twk6uk.png ',
      address: 'Av. Sarmiento 456',
      benefits: '10% de descuento en la cuota',
      BenefitEndDate: '2024-08-15',
    },
    {
      name: 'MORYDI',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/evi_twk6uk.png ',
      address: 'Av. Rivadavia 789',
      benefits: '10% efectivo (excepto ofertas)',
      description: 'Todos los dias',
    },
    {
      name: 'SOMOS LUZ',
      logo: 'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716701938/preload%20litro/evi_twk6uk.png ',
      address: 'Av. Belgrano 233',
      benefits: '20% de descuento en efectivo',
      description: 'Solo dias Miercoles',
    },
  ],
  communityKitchens: [
    {
      name: 'Carteluditos',
      address: 'Los Pelícanos 548',
      holder: 'Marcela Cuello',
      kidsNumber: '13',
      days: ['Martes', 'Jueves'],
      time: '19:00',
      description:
        'Merendero Carteluditos prepara merienda para los niños del barrio, asegurando que cada uno reciba una comida balanceada y nutritiva. Además, dependiendo de las donaciones recibidas, el merendero incluye cenas completas y una variedad de frutas frescas para los pequeños. Marcela y su equipo también organizan actividades recreativas para fomentar la convivencia y el desarrollo social de los niños.',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716868563/b9470113-0285-4f67-b217-70a04fd4295b.png',
    },
    {
      name: 'los Pekes del Bordo',
      address: 'Cervantes 789',
      holder: 'Julian Magallanes',
      kidsNumber: '35',
      days: ['Lunes', 'Miércoles', 'Viernes'],
      time: '10:00 - 18:00',
      description:
        'Los Pekes del Bordo es un lugar donde los niños pueden encontrar un ambiente seguro y acogedor. Además de preparar una merienda saludable cada día, Julian y su equipo organizan actividades deportivas en la canchita de fútbol del barrio, donde los chicos pueden jugar y aprender los valores del trabajo en equipo y la disciplina. También se realizan talleres educativos para apoyar el aprendizaje escolar de los niños.',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716868550/a83351b3-df44-47fe-813d-636f6a6fbc49.png',
    },
    {
      name: 'Corazoncitos Felices',
      address: 'Zavala Ortiz 890',
      holder: 'Natalia Asís',
      kidsNumber: '12',
      days: ['Lunes', 'Jueves', 'Viernes'],
      time: '11:00 - 19:00',
      description:
        'Merendero Corazones Felices no solo proporciona una merienda nutritiva, sino que también se convierte en un centro de actividades y apoyo para los niños del barrio. Natalia y su equipo coordinan diversas actividades recreativas y deportivas en la canchita de fútbol. Además, el merendero se encarga de organizar fiestas de cumpleaños para los niños, creando un espacio de celebración y alegría que fomenta el sentido de comunidad.',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716868520/786e8774-1abd-47fc-8e86-121f07aaf8b8.png',
    },
    {
      name: 'Entre risas y Juegos',
      address: 'San Martín 1234',
      holder: 'Lucía Fernández',
      kidsNumber: '20',
      days: ['Martes', 'Viernes'],
      time: '16:00 - 19:00',
      description:
        'Risas y Juegos es un merendero dedicado a proporcionar meriendas nutritivas y actividades recreativas para los niños del barrio. Lucía y su equipo trabajan incansablemente para crear un ambiente donde los niños puedan disfrutar de juegos, música y actividades creativas que estimulan su desarrollo emocional y social. Las meriendas incluyen una variedad de alimentos saludables que aseguran una dieta balanceada para los pequeños.',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716868534/9fa40050-5add-4915-bf73-58a169e3e72d.png',
    },
    {
      name: 'La Esperanza',
      address: 'Mitre 567',
      holder: 'Carlos Gutierrez',
      kidsNumber: '18',
      days: ['Miércoles', 'Sábado'],
      time: '15:00 - 18:00',
      description:
        'La esperanza se dedica a brindar apoyo alimenticio y educativo a los niños del barrio. Carlos y su equipo ofrecen meriendas saludables y talleres de apoyo escolar, ayudando a los niños a mejorar su rendimiento académico. Además, se realizan actividades de orientación vocacional y desarrollo de habilidades blandas, preparando a los niños para un futuro prometedor. El merendero se convierte en un faro de esperanza para muchas familias de la comunidad.',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716868581/f7d033f0-2615-4302-a8ae-433cc711826a.png',
    },
    {
      name: 'Pequeños sueños',
      address: 'Belgrano 789',
      holder: 'Sofía López',
      kidsNumber: '25',
      days: ['Lunes', 'Miércoles', 'Viernes'],
      time: '14:00 - 17:00',
      description:
        'Pequeños sueños es un merendero que brinda un ambiente seguro y acogedor para los niños del barrio. Sofía y su equipo preparan meriendas saludables y organizan actividades deportivas y recreativas que fomentan el desarrollo físico y emocional de los niños. Además, se realizan talleres de arte y música, permitiendo a los pequeños explorar sus talentos y expresar su creatividad en un entorno positivo y de apoyo.',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716868599/f34bf0bd-c622-4d6a-9639-615682f7ad79.png',
    },
    {
      name: 'Manitos Unidas',
      address: 'Urquiza 654',
      holder: 'Esteban Ramos',
      kidsNumber: '30',
      days: ['Martes', 'Jueves'],
      time: '17:00 - 20:00',
      description:
        'Manitos Unidas es un merendero comprometido con el bienestar y desarrollo integral de los niños del barrio. Esteban y su equipo proporcionan meriendas nutritivas y organizan talleres de manualidades y habilidades prácticas. Los niños aprenden a trabajar en equipo y desarrollar sus habilidades creativas en un entorno seguro y motivador. Además, se realizan actividades de apoyo escolar para mejorar el rendimiento académico de los pequeños.',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716869189/3eb51c1a-4b86-4552-bdcb-a2b0b069eee9.png',
    },
    {
      name: 'Pequeños Corazones',
      address: 'Rivadavia 345',
      holder: 'Ana María Pérez',
      kidsNumber: '22',
      days: ['Lunes', 'Viernes'],
      time: '15:00 - 18:00',
      description:
        'Pequeños Corazones es un merendero que proporciona meriendas saludables y actividades educativas para los niños del barrio. Ana María y su equipo organizan sesiones de lectura y juegos didácticos que fomentan el amor por el aprendizaje y la creatividad. Las meriendas incluyen una variedad de alimentos frescos y nutritivos, asegurando que cada niño reciba una dieta balanceada. El merendero también se enfoca en el desarrollo emocional de los niños, creando un ambiente de apoyo y cariño.',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716869203/1d94d10e-d218-47a6-bf52-ab458ae2cd72.png',
    },
    {
      name: 'Sonrisas Felices',
      address: 'Alem 678',
      holder: 'Roberto Sánchez',
      kidsNumber: '28',
      days: ['Miércoles', 'Sábado'],
      time: '16:00 - 19:00',
      description:
        'Sonrisas Felices es un merendero que se dedica a proporcionar meriendas nutritivas y actividades artísticas para los niños del barrio. Roberto y su equipo organizan talleres de arte y música, permitiendo a los niños explorar sus talentos y desarrollar nuevas habilidades en un ambiente positivo. Las meriendas incluyen una variedad de alimentos frescos y saludables, garantizando una nutrición adecuada para los pequeños. Además, se realizan actividades recreativas que fomentan la convivencia y el trabajo en equipo.',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716869223/7c32d93c-2b35-4d65-8f36-e257f11dcd75.png',
    },
    {
      name: 'Abrazos calidos',
      address: 'Moreno 123',
      holder: 'Cecilia Torres',
      kidsNumber: '26',
      days: ['Martes', 'Jueves'],
      time: '14:00 - 17:00',
      description:
        'Abrazos calidos es un merendero dedicado a brindar apoyo alimenticio y emocional a los niños del barrio. Cecilia y su equipo proporcionan meriendas nutritivas y organizan talleres de habilidades sociales y apoyo emocional. Los niños aprenden a manejar sus emociones y desarrollar relaciones saludables en un ambiente seguro y de apoyo. Las meriendas incluyen una variedad de alimentos frescos y nutritivos, asegurando una dieta balanceada para cada niño.',
      photo:
        'https://res.cloudinary.com/dzxrc9b6o/image/upload/v1716869213/2249f3d4-4c6a-4ce3-a49a-34198e5993f2.png',
    },
  ],
};
