import { INGREDIENTS } from '../data/recipes';

const ADJECTIVES = [
  'delightful', 'interesting', 'unique', 'creative', 'surprising',
  'questionable', 'peculiar', 'unusual', 'mysterious', 'bewildering',
  'extraordinary', 'remarkable', 'distinctive', 'exceptional', 'innovative'
];

const SUCCESS_MESSAGES = [
  'Purr-fectly cooked!',
  'Meow-velous creation!',
  'Paw-sitively delicious!',
  'Fur-bulous dish!',
  'Cat-tastic cooking!',
  'Whisker-licking good!',
  'Tail-wagging tasty!',
  'Purr-emium quality!',
  'Claw-some work!',
  'Feline-tastic flavor!'
];

const TASTE_DESCRIPTIONS = [
  'with a subtle blend of flavors',
  'bursting with umami',
  'perfectly balanced',
  'with an elegant presentation',
  'that melts in your mouth',
  'with amazing texture',
  'that exceeds expectations',
  'with harmonious ingredients',
  'that\'s comfort food at its best',
  'with authentic taste'
];

export const getFeedback = (input: string | string[], isSuccess: boolean): { message: string } => {
  if (isSuccess) {
    const successMessage = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
    const tasteDescription = TASTE_DESCRIPTIONS[Math.floor(Math.random() * TASTE_DESCRIPTIONS.length)];
    return {
      message: `${successMessage} A ${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${input} ${tasteDescription}!`
    };
  }

  // For wrong combinations
  const ingredients = Array.isArray(input) 
    ? input.map(id => INGREDIENTS.find(i => i.id === id)?.name).filter(Boolean)
    : [];
  
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  return {
    message: `Oops! Your ${adjective} creation of ${ingredients.join(', ')} didn't quite work out... (-10 points per ingredient)`
  };
};