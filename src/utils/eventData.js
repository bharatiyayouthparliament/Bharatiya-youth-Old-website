
import React from 'react';

// Placeholder data. In a real app, this would come from a CMS or API.

const patronText = `Our objective is to promote the intellectual development of the nation, students, and youth so that they can align their thoughts with the interests of the nation. Keeping Indian values and traditions at the center, in today's rapidly changing global landscape, the youth must be capable of engaging in healthy, progressive dialogue.

The success of this mission is achievable only through the contributions of visionary and inspiring mentors. Their experience, guidance, and motivation empower young minds to reach new heights. With this vision, we have appointed our esteemed Patron Council as part of the "Pratham Vishawa Dharma Samvad" and "Indian Youth Parliament".

These respected patrons serve as a source of inspiration and guide our efforts with dedication. We remain sincerely grateful for their invaluable support and wisdom.`;

const generateSpeakers = (count) => Array.from({ length: count }, (_, i) => ({
  name: `Speaker Name ${i + 1}`,
  designation: `Expert Designation ${i + 1}`,
  timeSlot: `1${i}:00 AM - 1${i}:45 AM`,
}));

const generateGallery = (count) => {
    const placements = ["hero", "highlights", "delegates", "ceremony", "media"];
    return Array.from({ length: count }, (_, i) => ({
        image: `https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&h=800&fit=crop&ixid=${i}`,
        placement: placements[i % placements.length],
    }));
};


export const fourthEditionData = {
  id: '4',
  slug: '/sessions/4th-edition',
  title: "4th Session – Organized by SRRO",
  subtitle: "Organized by Social Reforms and Research Organization",
  date: "12 January 2025, Sunday",
  venue: "Amity University, Noida (UP)",
  description: "Details about the 4th session will be available here soon.",
  speakers: generateSpeakers(8),
  gallery: generateGallery(12),
  patron: patronText,
};

export const thirdEditionData = {
  id: '3',
  slug: '/sessions/3rd-edition',
  title: "3rd Session – Organized as VDS",
  subtitle: "Organized As VDS",
  date: "12 January 2024, 12:00 Noon",
  venue: "Amity University Noida, UP",
  description: "Details about the 3rd session will be available here soon.",
  speakers: generateSpeakers(7),
  gallery: generateGallery(10),
  patron: patronText,
};

export const secondEditionData = {
  id: '2',
  slug: '/sessions/2nd-edition',
  title: "2nd Session – Organized as VDS",
  subtitle: "Organized As VDS",
  date: "12 January 2023, 12:00 Noon",
  venue: "Amity University Noida, UP",
  description: "Details about the 2nd session will be available here soon.",
  speakers: generateSpeakers(6),
  gallery: generateGallery(8),
  patron: patronText,
};

export const firstEditionData = {
  id: '1',
  slug: '/sessions/1st-edition',
  title: "1st Session – Organized as VDS",
  subtitle: "Organized As VDS",
  date: "12 January 2022, 12:00 Noon",
  venue: "Amity University Noida, UP",
  description: "Details about the 1st session will be available here soon.",
  speakers: generateSpeakers(5),
  gallery: generateGallery(6),
  patron: patronText,
};

export const allEvents = [fourthEditionData, thirdEditionData, secondEditionData, firstEditionData];
