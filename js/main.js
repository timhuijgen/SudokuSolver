import groups from './initialData';
import './globals';
import DataClass from './Data';
import UIClass from './UI';
import Solver from './Solver';

console.log('==== Construction UI Class ====');
const UI = new UIClass();

console.log('==== Construction Data Class ====');
const Data = new DataClass(groups, UI);

console.log('==== Coloring groups ====');
UI.colorGroups(groups);

console.log('==== Construction Solver Class ====');
window.Solver = new Solver(Data);


