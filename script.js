class Shield {
  constructor(options) {
    var {
      name,
      calculateDamage = creature => creature.damage,
      calculateChargesVariation = () => 0,
      getCharges = () => 0,
      evasion = 0,
      reflectsSpells = false
    } = options;
    this.name = name;
    this.calculateDamage = calculateDamage;
    this.calculateChargesVariation = calculateChargesVariation;
    this.getCharges = getCharges;
    this.evasion = 0;
    this.reflectsSpells = reflectsSpells;
    var option = document.createElement('option');
    option.innerText = name;
    option.object = this;
    document.getElementById('shield').appendChild(option);
  }
}

class Creature {
  constructor(options) {
    var {
      damage = 0,
        life = 0,
        airborne = false,
        psion = false,
        bioluminiscent = false
    } = options;
    this.damage = damage;
    this.life = 0;
    this.airborne = airborne;
    this.psion = psion;
    this.bioluminiscent = bioluminiscent;
  }
}

addEventListener('load', () => {
  function createCreatureDiv() {
    var creatureDiv = document.createElement('div');
    creatureDiv.className = 'creature';
    var attackDiv = document.createElement('div');
    attackDiv.appendChild(document.createTextNode('Attack: '));
    var attackInput =
  }

  new Shield({
    name: "Shield",
    calculateDamage: creature => creature.damage - 1
  });
  new Shield({
    name: "Tower Shield",
    calculateDamage: creature => creature.damage - 2
  });
  new Shield({
    name: "Dissipation Shield",
    calculateDamage: (creature, entropyQuanta) => creature.damage - 3 * entropyQuanta,
    calculateChargesVariation: damage => -Math.ceil(damage / 3),
    getCharges: () => document.getElementById('entropy')
  });
  new Shield({
    name: "Dissipation Field",
    calculateDamage: (creature, quanta) => creature.damage - quanta,
    calculateChargesVariation: damage => -damage
  });
  new Shield({
    name: "Bone Wall",
    calculateDamage: (creature, charges) => charges ? 0 : creature.damage,
    calculateChargesVariation: () => -1
  });
  new Shield({
    name: "Gravity Shield",
    calculateDamage: creature => creature.life < 5 ? creature.damage : 0
  });
  new Shield({
    name: "Titanium Shield",
    calculateDamage: creature => creature.damage - 2
  });
  new Shield({
    name: "Diamond Shield",
    calculateDamage: creature => creature.damage - 3
  });
  new Shield({
    name: "Thorn Caparace"
  });
  new Shield({
    name: "Spine Caparace",
    calculateDamage: creature => creature.damage - 1
  });
  new Shield({
    name: "Emerald Shield",
    calculateDamage: creature => creature.damage - 1,
    reflectsSpells: true
  });
  new Shield({
    name: "Jade Shield",
    calculateDamage: creature => creature.damage - 2,
    reflectsSpells: true
  });
  new Shield({
    name: "Fire Shield"
  });
  new Shield({
    name: "Fire Buckler"
  });
  new Shield({
    name: "Ice Shield",
    calculateDamage: creature => creature.damage - 1
  });
  new Shield({
    name: "Permafrost Shield",
    calculateDamage: creature => creature.damage - 2
  });
  new Shield({
    name: "Solar Shield",
    calculateDamage: creature => creature.damage - 1
  });
  new Shield({
    name: "Solar Buckler",
    calculateDamage: creature => creature.damage - 1
  });
  new Shield({
    name: "Reflective Shield",
    calculateDamage: creature => creature.damage - 1,
    reflectsSpells: true
  });
  new Shield({
    name: "Mirror shield",
    calculateDamage: creature => creature.damage - 1,
    reflectsSpells: true
  });
  new Shield({
    name: "Hope",
    calculateDamage: (creature, damageReduction) => creature.damage - damageReduction,
  });
  new Shield({
    name: "Hope*",
    calculateDamage: (creature, damageReduction) => creature.damage - damageReduction - 1
  });
  new Shield({
    name: "Fog Shield",
    evasion: 4
  });
  new Shield({
    name: "Improved Fog",
    evasion: 4
  });
  new Shield({
    name: "Wings",
    calculateDamage: creature => creature.airborne ? creature.damage : 0
  });
  new Shield({
    name: "Procrastination"
  });
  new Shield({
    name: "Turtle Shield"
  });
  new Shield({
    name: "Dusk Mantle",
    evasion: 5
  });
  new Shield({
    name: "Improved Dusk",
    calculateDamage: creature => creature.damage,
    evasion: 5
  });
  new Shield({
    name: "Dimensional Shield",
    evasion: 10
  });
  new Shield({
    name: "Phase Shield",
    evasion: 10
  });
  addEventListener('change', () => {
    function calculateDamageDistribution() {
      function calculateSingleCombination(currentCreature, currentDamage, charges) {
        var creature = creatures[currentCreature];
        for (var i = 0; i < 4; i++)
          for (var j = 0; j < 10; j++) {
            var damage = currentDamage;
            if (i < shardsAmount && creature.airborne) {
              damage += Math.ceil(1.5 * creature.damage)
            } else {
              if (!(creature.psion && reflectsSpells)) {
                damage += Math.max(0, (evasion <= j) * shield.calculateDamage(creature, charges));
              }
              charges = Math.max(0, charges + shield.calculateChargesVariation(creature.damage));
            }
            if (currentCreature + 1 < creatures.length) calculateSingleCombination(currentCreature + 1, damage, charges);
            else {
              damageDistribution.set(0, parseFloat((damageDistribution.get(0) - chance).toFixed(precision)));
              damageDistribution.set(damage, parseFloat((damageDistribution.get(damage) + chance || chance).toFixed(precision)));
            }
          }
      }

      var creatures = [];
      for (var i = 0; i < document.getElementsByClassName('creature').length; i++) {
        creatures.push(new Creature({
          damage: Math.round(document.getElementsByClassName('damage')[i].valueAsNumber),
          life: Math.round(document.getElementsByClassName('life')[i].valueAsNumber),
          airborne: document.getElementsByClassName('airborne')[i].checked,
          psion: document.getElementsByClassName('psion')[i].checked,
          bioluminiscent: document.getElementsByClassName('bioluminiscent')[i].checked
        }))
      }
      var shield = document.getElementById('shield').selectedOptions[0].object;
      var damageDistribution = new Map().set(0, 1);
      var chance = 1 / Math.pow(40, creatures.length);
      var precision = -Math.floor(Math.log10(chance)) + 2; // + 2?
      console.log(precision);
      var evasion = shield.evasion;
      var charges = shield.getCharges();
      var reflectsSpells = shield.reflectsSpells;
      var shardsAmount = document.getElementById('shards-amount').selectedIndex;
      calculateSingleCombination(0, charges);
      return damageDistribution;
    }

    var output = document.getElementById('output');
    var sortedResults = [];
    var averageDamage = 0;
    output.innerHTML = '';
    for (var result of calculateDamageDistribution()) {
      sortedResults.push(result);
    }
    sortedResults.sort((a, b) => a[0] - b[0]);
    for (result of sortedResults) {
      if (result[1]) {
        output.innerHTML += 'Chance for ' + result[0] + ' damage: ' + result[1] * 100 + '%<br>';
        averageDamage += result[0] * result[1];
      }
    }
    output.innerHTML += 'Average damage: ' + averageDamage;
  })
});