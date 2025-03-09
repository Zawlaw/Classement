"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.teacher.createMany({
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
                            { name: 'MARIE CLAIRE GUERPILLON', subject: 'Enseignement Moral et Civique' },
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
                    })];
                case 1:
                    _a.sent();
                    console.log('✅ Teachers with subjects added successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) { return console.error(e); })
    .finally(function () { return prisma.$disconnect(); });
