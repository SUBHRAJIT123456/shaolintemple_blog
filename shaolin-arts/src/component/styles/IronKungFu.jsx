import React from 'react';
import ironKungFuImg from '../../component/assets/images/iron.jpeg';
import './styles.css';

const IronKungFu = () => {
  return (
    <div className="style-page-container text-center">
      <h1>Iron Kung Fu</h1>
      <img src={ironKungFuImg} alt="Iron Kung Fu" className="style-image mb-4" />
      <p>
      Iron Kung Fu, often referred to as Iron Palm or Iron Body training, is a traditional Chinese martial art focused on developing strength, resilience, and striking power. Here are the key aspects:

Key Concepts
Iron Palm Training:

Focuses on conditioning the palms and fingers to deliver powerful strikes without injury.
Practitioners strike various surfaces, progressively increasing hardness to toughen their hands.
Iron Body Training:

Aims to strengthen the entire body to absorb impacts.
Involves controlled impacts on different body parts, enhancing resilience and internal strength.
Stances and Movement:

Utilizes low, stable stances for power generation while emphasizing fluid movements for agility.
Philosophical Aspects
Discipline and Patience: Emphasizes long-term commitment to improvement.
Mind-Body Connection: Enhances mental focus and body awareness.
Internal Strength: Balances physical power with mental control.
Applications
Iron Kung Fu techniques are effective in self-defense and martial arts competitions, providing practitioners with powerful strikes and the ability to withstand blows.

In essence, Iron Kung Fu is a holistic practice that combines physical conditioning, technique, and deep philosophical insights, promoting both personal growth and combat effectiveness.
      </p>
    </div>
  );
};

export default IronKungFu;
