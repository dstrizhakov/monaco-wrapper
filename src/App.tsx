import "./App.css";
import MonacoWrapper from "./components/MonacoWrapper";
import ErrorBoundary from "./ErrorBoundary";

const originalCodeExample = `
export type User = {
  name: string,
  age: number,
  occupation: string,
  job: string
};
export const users: User[] = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut'
    }
];

export function logPerson(user: User): void {
    console.log(user.name, user.age);
}
console.log('Users:');
users.forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/objects.html
// `;

function App() {
  return (
    <>
      <ErrorBoundary>
        <MonacoWrapper originalCode={originalCodeExample} />
      </ErrorBoundary>
    </>
  );
}

export default App;
