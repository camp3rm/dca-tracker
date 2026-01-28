import calculatorContent from '@constants/calculatorContent.json';

type CalculatorType = 'futureProfit' | 'investmentGoal' | 'target' | 'dcaSimulator';

interface CalculatorInfoProps {
  type: CalculatorType;
}

export const CalculatorInfo = ({ type }: CalculatorInfoProps) => {
  const content = calculatorContent[type];

  return (
    <div className='infoContainer'>
      <div className='description'>
        <h3>What does this calculator do?</h3>
        <p>{content.description}</p>
      </div>

      <div className='inputsInfo'>
        <h4>Input Fields:</h4>
        <ul>
          {Object.entries(content.inputs).map(([key, field]) => (
            <li key={key}>
              <strong>{field.label}:</strong> {field.description}
            </li>
          ))}
        </ul>
      </div>

      <div className='outputsInfo'>
        <h4>Results Explanation:</h4>
        <ul>
          {Object.entries(content.outputs).map(([key, field]) => (
            <li key={key}>
              <strong>{field.label}:</strong> {field.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};