import React from 'react';
import fiveAnimalsImg from '../../component/assets/images/five.webp';
import './styles.css';

const FiveAnimalKungFu = () => {
  return (
    <div className="style-page-container text-center">
      <h1>Five Animal Kung Fu</h1>
      <img src={fiveAnimalsImg} alt="Five Animal Kung Fu" className="style-image mb-4" />
      <p>
      1. Tiger
The tiger represents strength, power, and ferocity. Its movements emphasize robust, forceful strikes and powerful stances. Practitioners who study the tiger style focus on developing strong legs and core muscles, allowing for explosive attacks and deep-rooted stances. Techniques often include powerful punches, clawing motions, and low, grounded stances that enable quick, powerful movements. The philosophy behind tiger kung fu is rooted in the idea of overwhelming the opponent with brute strength and directness.

2. Crane
The crane embodies grace, fluidity, and balance. Its techniques emphasize agility, precision, and a deep understanding of body mechanics. Practitioners of crane style focus on soft, flowing movements, utilizing high stances and strikes that mimic the graceful motions of a crane in flight. The crane style teaches practitioners to maintain balance and poise while executing techniques like pecking strikes and sweeping movements, which can effectively redirect an opponent's energy. The philosophy of crane kung fu centers around evasion, timing, and utilizing the opponent's force against them.

3. Leopard
The leopard represents speed, agility, and versatility. This style focuses on quick, explosive movements and strikes that require a combination of speed and precision. Practitioners of leopard style emphasize fluid footwork, rapid attacks, and techniques that capitalize on speed and surprise. Leopard kung fu often incorporates a mix of striking and grappling techniques, making it adaptable for various combat situations. The philosophy of the leopard style is about being unpredictable, striking swiftly, and evading attacks with quick, agile movements.

4. Snake
The snake symbolizes flexibility, sensitivity, and subtlety. This style emphasizes smooth, flowing movements that are often characterized by coiling and uncoiling actions, mimicking the movements of a snake. Practitioners focus on developing sensitivity to an opponent’s movements, allowing them to react swiftly and appropriately. Techniques include swift strikes, joint locks, and evasive maneuvers that exploit openings and vulnerabilities. The snake style teaches practitioners to be aware of their environment, using subtlety and strategy to overcome stronger opponents.

5. Dragon
The dragon is a symbol of power, wisdom, and mysticism. The dragon style incorporates elements from all four of the other animals, focusing on harmony between strength and softness. Practitioners learn to integrate the techniques of the tiger, crane, leopard, and snake into a cohesive fighting strategy. The dragon style emphasizes fluidity, creativity, and adaptability, allowing practitioners to respond effectively to various combat situations. Philosophically, the dragon represents the mastery of one's self, harnessing inner strength and wisdom to become a more effective fighter.
      </p>
    </div>
  );
};

export default FiveAnimalKungFu;
