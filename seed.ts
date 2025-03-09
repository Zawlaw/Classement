import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.teacher.createMany({
    data: [
      { name: 'AKDAH SAMIA', subject: 'Sciences de la Vie et de la Terre' },
      { name: 'BARDOUX YANNIS', subject: 'Mathématiques' },
      { name: 'BELFOND SARAH', subject: 'Anglais LV1' },
      { name: 'BERRAH SABRINA', subject: 'Anglais LV1' },
      { name: 'BOULDOIRES VALERIE', subject: 'Sciences Numériques et Technologie' },
      { name: 'BOURGEOIS-DE CLIPPEL VALERIE', subject: 'Numérique et Sciences Informatiques' },
      { name: 'BRIE MATHIEU', subject: 'Enseignement Scientifique' },
      { name: 'CHENIKI YAKOUTA', subject: 'Sciences Économiques et Sociales' },
      { name: "D'HENRY MIREILLE", subject: 'Physique-Chimie' },
      { name: 'DAUPHIN-MEUNIER DAMIEN', subject: 'Histoire-Géo, Géopolitique & Sc. Politiques' },
      { name: 'DUPUY CHANTAL', subject: 'LLC Anglais, Monde contemporain' },
      { name: 'FERJOUX Jean-Charles', subject: 'Education Physique et Sportive' },
      { name: 'FEYDEL ISABELLE', subject: 'Mathématiques' },
      { name: 'GALOISY THOMAS', subject: 'Histoire-Géo, Géopolitique & Sc. Politiques' },
      { name: 'HAMARD.C', subject: 'Anglais LV1' },
      { name: 'HOGUIN CHRISTOPHE', subject: 'Mathématiques' },
      { name: 'JOLITON ELISE', subject: 'Mathématiques' },
      { name: 'LAMBERT CHRISTOPHE', subject: 'Humanités, Littérature et Philosophie' },
      { name: 'LE SAUX Jean-François', subject: 'Physique-Chimie' },
      { name: 'M. GIRARDIE', subject: 'Sciences de la Vie et de la Terre' },
      { name: 'MACE STEPHANIE', subject: 'Espagnol LV2' },
      { name: 'MARIE CLAIRE GUERPILLON', subject:'Enseignement Moral et Civique'},
      { name: 'MIGNOT CHRISTOPHE', subject: 'Physique-Chimie' },
      { name: 'MINABERRY ERIC', subject: 'Mathématiques' },
      { name: 'ZEFERINO', subject: 'Management et Gestion' },
      { name: 'NAQUET MARIE-CHRISTINE', subject: 'Histoire-Géo, Géopolitique & Sc. Politiques' },
      { name: 'RENIER MELODY', subject: 'Management' },
      { name: 'TAU MINGCHAO', subject: 'Chinois LV3' },
      { name: 'TRUCHI PAUL', subject: 'Sciences Économiques et Sociales' },
      { name: 'ULESIE DEBORAH', subject: 'Anglais LV1' },
      { name: 'ZIKOS STELLA', subject: 'Allemand LV2' },
    ],
  });

  console.log('✅ Teachers with subjects added successfully!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
