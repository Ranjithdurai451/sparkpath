
import { FormProvider } from '@/context/FormContext';
import Navbar from '@/components/Navbar';
import StartupForm from '@/components/StartupForm';

const Dashboard = () => {
  return (
    <FormProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20">
          <div className="container px-4 sm:px-6 lg:px-8 py-10">
           
            
            <StartupForm />
          </div>
        </main>
        
      </div>
    </FormProvider>
  );
};

export default Dashboard;
