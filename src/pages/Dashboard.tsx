
import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Card, CardTitle, CardContent } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Plus, Edit, Save, User, Briefcase, DollarSign } from "lucide-react";

// Simplified type for dashboard data
interface DashboardData {
  people: {
    strengths: string;
    needsHelp: string;
    collaborators: Array<{ name: string; role: string; contact: string }>;
    values: string;
  };
  process: {
    workflow: string[];
    tasks: Array<{ title: string; steps: string[] }>;
    tools: Array<{ name: string; url: string }>;
  };
  profit: {
    mvpDescription: string;
    testLinks: Array<{ title: string; url: string }>;
    finances: Array<{ date: string; description: string; income: number; expense: number }>;
  };
}

const defaultData: DashboardData = {
  people: {
    strengths: "",
    needsHelp: "",
    collaborators: [],
    values: "",
  },
  process: {
    workflow: ["Idea", "Build", "Launch", "Feedback"],
    tasks: [{ title: "How I launch a product", steps: ["Plan", "Create", "Test", "Launch"] }],
    tools: [],
  },
  profit: {
    mvpDescription: "",
    testLinks: [],
    finances: [
      { date: new Date().toISOString().split('T')[0], description: "", income: 0, expense: 0 }
    ],
  },
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("people");
  const [dashboardData, setDashboardData] = useState<DashboardData>(defaultData);
  const [editing, setEditing] = useState<string | null>(null);
  const [tempFormData, setTempFormData] = useState<any>({});
  const [setupData, setSetupData] = useState<any>(null);

  useEffect(() => {
    // Load data from localStorage
    const savedSetupData = localStorage.getItem('p3SetupData');
    if (savedSetupData) {
      setSetupData(JSON.parse(savedSetupData));
    }

    const savedDashboardData = localStorage.getItem('p3DashboardData');
    if (savedDashboardData) {
      setDashboardData(JSON.parse(savedDashboardData));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage on change
    localStorage.setItem('p3DashboardData', JSON.stringify(dashboardData));
  }, [dashboardData]);

  const handleEdit = (section: string, initialData?: any) => {
    setEditing(section);
    setTempFormData(initialData || {});
  };

  const handleSave = (section: string, category: keyof DashboardData) => {
    const updatedData = { ...dashboardData };
    
    // Update the specific section based on category and section
    if (category === 'people') {
      if (section === 'collaborator' && tempFormData.name) {
        if (editing === 'new-collaborator') {
          updatedData.people.collaborators.push(tempFormData);
        } else {
          const index = parseInt(editing!.split('-')[1]);
          updatedData.people.collaborators[index] = tempFormData;
        }
      } else if (section === 'strengths') {
        updatedData.people.strengths = tempFormData.text || '';
      } else if (section === 'needsHelp') {
        updatedData.people.needsHelp = tempFormData.text || '';
      } else if (section === 'values') {
        updatedData.people.values = tempFormData.text || '';
      }
    } else if (category === 'process') {
      if (section === 'tool' && tempFormData.name && tempFormData.url) {
        if (editing === 'new-tool') {
          updatedData.process.tools.push(tempFormData);
        } else {
          const index = parseInt(editing!.split('-')[1]);
          updatedData.process.tools[index] = tempFormData;
        }
      } else if (section === 'workflow') {
        updatedData.process.workflow = tempFormData.steps || [];
      } else if (section === 'task' && tempFormData.title) {
        if (editing === 'new-task') {
          updatedData.process.tasks.push({
            title: tempFormData.title,
            steps: tempFormData.steps || []
          });
        } else {
          const index = parseInt(editing!.split('-')[1]);
          updatedData.process.tasks[index] = {
            title: tempFormData.title,
            steps: tempFormData.steps || []
          };
        }
      }
    } else if (category === 'profit') {
      if (section === 'mvp') {
        updatedData.profit.mvpDescription = tempFormData.text || '';
      } else if (section === 'testLink' && tempFormData.title && tempFormData.url) {
        if (editing === 'new-testLink') {
          updatedData.profit.testLinks.push(tempFormData);
        } else {
          const index = parseInt(editing!.split('-')[1]);
          updatedData.profit.testLinks[index] = tempFormData;
        }
      } else if (section === 'finance') {
        if (editing === 'new-finance') {
          updatedData.profit.finances.push(tempFormData);
        } else {
          const index = parseInt(editing!.split('-')[1]);
          updatedData.profit.finances[index] = tempFormData;
        }
      }
    }
    
    setDashboardData(updatedData);
    setEditing(null);
  };

  const handleCancel = () => {
    setEditing(null);
    setTempFormData({});
  };

  const addNewFinanceRow = () => {
    handleEdit('new-finance', {
      date: new Date().toISOString().split('T')[0],
      description: "",
      income: 0,
      expense: 0
    });
  };

  const calculateNetProfit = () => {
    return dashboardData.profit.finances.reduce((sum, item) => {
      return sum + (item.income - item.expense);
    }, 0);
  };

  const renderPeopleTab = () => (
    <div className="space-y-8 animate-fade-in">
      <section>
        <h3 className="text-xl font-semibold mb-4">Start with You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardTitle>
              <div className="flex justify-between items-center">
                <span>🧠 Your Strengths</span>
                <button
                  onClick={() => handleEdit('strengths', { text: dashboardData.people.strengths })}
                  className="text-sm text-muted-foreground hover:text-black transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </CardTitle>
            <CardContent>
              {editing === 'strengths' ? (
                <div className="space-y-4">
                  <Textarea
                    placeholder="I'm good at..."
                    value={tempFormData.text || ''}
                    onChange={(e) => setTempFormData({ text: e.target.value })}
                    className="w-full"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancel}
                      className="text-sm text-muted-foreground hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('strengths', 'people')}
                      className="text-sm flex items-center gap-1 font-medium"
                    >
                      <Save className="h-3 w-3" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {dashboardData.people.strengths || "Click edit to add your strengths"}
                </p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardTitle>
              <div className="flex justify-between items-center">
                <span>🤔 I Need Help With</span>
                <button
                  onClick={() => handleEdit('needsHelp', { text: dashboardData.people.needsHelp })}
                  className="text-sm text-muted-foreground hover:text-black transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </CardTitle>
            <CardContent>
              {editing === 'needsHelp' ? (
                <div className="space-y-4">
                  <Textarea
                    placeholder="I need help with..."
                    value={tempFormData.text || ''}
                    onChange={(e) => setTempFormData({ text: e.target.value })}
                    className="w-full"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancel}
                      className="text-sm text-muted-foreground hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('needsHelp', 'people')}
                      className="text-sm flex items-center gap-1 font-medium"
                    >
                      <Save className="h-3 w-3" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {dashboardData.people.needsHelp || "Click edit to add what you need help with"}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">👥 Collaborators</h3>
          <ButtonCustom
            onClick={() => handleEdit('new-collaborator', { name: '', role: '', contact: '' })}
            size="sm"
            className="h-8 px-3 py-1"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Person
          </ButtonCustom>
        </div>
        
        {editing && editing.includes('collaborator') ? (
          <Card className="mb-4">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <Input
                    placeholder="Name"
                    value={tempFormData.name || ''}
                    onChange={(e) => setTempFormData({ ...tempFormData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Role</label>
                  <Input
                    placeholder="Mentor, Freelancer, Partner, etc."
                    value={tempFormData.role || ''}
                    onChange={(e) => setTempFormData({ ...tempFormData, role: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Contact Info</label>
                  <Input
                    placeholder="Email, phone, or link"
                    value={tempFormData.contact || ''}
                    onChange={(e) => setTempFormData({ ...tempFormData, contact: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={handleCancel}
                    className="text-sm text-muted-foreground hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave('collaborator', 'people')}
                    className="text-sm flex items-center gap-1 font-medium"
                  >
                    <Save className="h-3 w-3" /> Save
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboardData.people.collaborators.length > 0 ? (
            dashboardData.people.collaborators.map((collaborator, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardContent className="flex flex-col h-full pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">{collaborator.name}</h4>
                      <p className="text-sm text-muted-foreground">{collaborator.role}</p>
                    </div>
                    <button
                      onClick={() => handleEdit(`collaborator-${index}`, { ...collaborator })}
                      className="text-sm text-muted-foreground hover:text-black transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm mt-2">{collaborator.contact}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-6 text-muted-foreground">
              No collaborators added yet. Click "Add Person" to get started.
            </div>
          )}
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">🧭 Values & Culture</h3>
          <button
            onClick={() => handleEdit('values', { text: dashboardData.people.values })}
            className="text-sm text-muted-foreground hover:text-black transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
        
        <Card>
          <CardContent className="pt-4">
            {editing === 'values' ? (
              <div className="space-y-4">
                <Textarea
                  placeholder="Write 2-3 principles you want to build by..."
                  value={tempFormData.text || ''}
                  onChange={(e) => setTempFormData({ text: e.target.value })}
                  className="w-full min-h-[150px]"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancel}
                    className="text-sm text-muted-foreground hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave('values', 'people')}
                    className="text-sm flex items-center gap-1 font-medium"
                  >
                    <Save className="h-3 w-3" /> Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground whitespace-pre-line">
                {dashboardData.people.values || "Write 2-3 principles you want to build by..."}
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );

  const renderProcessTab = () => (
    <div className="space-y-8 animate-fade-in">
      <section>
        <h3 className="text-xl font-semibold mb-4">Build Repeatable Systems</h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Main Workflow</h4>
            <button
              onClick={() => handleEdit('workflow', { 
                steps: [...dashboardData.process.workflow]
              })}
              className="text-sm text-muted-foreground hover:text-black transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
          </div>
          
          {editing === 'workflow' ? (
            <Card className="mb-4">
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {tempFormData.steps?.map((step: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={step}
                        onChange={(e) => {
                          const newSteps = [...tempFormData.steps];
                          newSteps[index] = e.target.value;
                          setTempFormData({ ...tempFormData, steps: newSteps });
                        }}
                      />
                      <button
                        onClick={() => {
                          const newSteps = [...tempFormData.steps];
                          newSteps.splice(index, 1);
                          setTempFormData({ ...tempFormData, steps: newSteps });
                        }}
                        className="text-muted-foreground hover:text-black"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      setTempFormData({
                        ...tempFormData,
                        steps: [...(tempFormData.steps || []), ""]
                      });
                    }}
                    className="text-sm text-muted-foreground hover:text-black flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" /> Add Step
                  </button>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      onClick={handleCancel}
                      className="text-sm text-muted-foreground hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('workflow', 'process')}
                      className="text-sm flex items-center gap-1 font-medium"
                    >
                      <Save className="h-3 w-3" /> Save
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex border rounded-lg overflow-hidden">
              {dashboardData.process.workflow.map((step, index) => (
                <div 
                  key={index}
                  className="flex-1 p-4 text-center font-medium relative"
                >
                  <div>{step}</div>
                  {index < dashboardData.process.workflow.length - 1 && (
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-1 z-10">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">🔁 Repeatable Tasks</h3>
          <ButtonCustom
            onClick={() => handleEdit('new-task', { title: '', steps: [] })}
            size="sm"
            className="h-8 px-3 py-1"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Checklist
          </ButtonCustom>
        </div>
        
        {editing && editing.includes('task') ? (
          <Card className="mb-4">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Checklist Title</label>
                  <Input
                    placeholder="e.g., How I launch a product"
                    value={tempFormData.title || ''}
                    onChange={(e) => setTempFormData({ ...tempFormData, title: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Steps</label>
                  {tempFormData.steps?.map((step: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Input
                        value={step}
                        placeholder={`Step ${index + 1}`}
                        onChange={(e) => {
                          const newSteps = [...tempFormData.steps];
                          newSteps[index] = e.target.value;
                          setTempFormData({ ...tempFormData, steps: newSteps });
                        }}
                      />
                      <button
                        onClick={() => {
                          const newSteps = [...tempFormData.steps];
                          newSteps.splice(index, 1);
                          setTempFormData({ ...tempFormData, steps: newSteps });
                        }}
                        className="text-muted-foreground hover:text-black"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      setTempFormData({
                        ...tempFormData,
                        steps: [...(tempFormData.steps || []), ""]
                      });
                    }}
                    className="text-sm text-muted-foreground hover:text-black flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" /> Add Step
                  </button>
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={handleCancel}
                    className="text-sm text-muted-foreground hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave('task', 'process')}
                    className="text-sm flex items-center gap-1 font-medium"
                  >
                    <Save className="h-3 w-3" /> Save
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
        
        <div className="space-y-4">
          {dashboardData.process.tasks.map((task, taskIndex) => (
            <Card key={taskIndex}>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">{task.title}</h4>
                  <button
                    onClick={() => handleEdit(`task-${taskIndex}`, { 
                      title: task.title, 
                      steps: [...task.steps] 
                    })}
                    className="text-sm text-muted-foreground hover:text-black transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                
                <ul className="space-y-2">
                  {task.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-start gap-2">
                      <div className="rounded-full border h-5 w-5 flex-shrink-0 mt-0.5"></div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
          
          {dashboardData.process.tasks.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No checklists added yet. Click "Add Checklist" to get started.
            </div>
          )}
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">🛠️ Tools I Use</h3>
          <ButtonCustom
            onClick={() => handleEdit('new-tool', { name: '', url: '' })}
            size="sm"
            className="h-8 px-3 py-1"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Tool
          </ButtonCustom>
        </div>
        
        {editing && editing.includes('tool') ? (
          <Card className="mb-4">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Tool Name</label>
                  <Input
                    placeholder="e.g., Notion, Trello, etc."
                    value={tempFormData.name || ''}
                    onChange={(e) => setTempFormData({ ...tempFormData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">URL</label>
                  <Input
                    placeholder="https://"
                    value={tempFormData.url || ''}
                    onChange={(e) => setTempFormData({ ...tempFormData, url: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={handleCancel}
                    className="text-sm text-muted-foreground hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave('tool', 'process')}
                    className="text-sm flex items-center gap-1 font-medium"
                  >
                    <Save className="h-3 w-3" /> Save
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dashboardData.process.tools.map((tool, index) => (
            <Card key={index} interactive>
              <CardContent className="pt-4 flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <a 
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium hover:underline"
                  >
                    {tool.name}
                  </a>
                  <button
                    onClick={() => handleEdit(`tool-${index}`, { ...tool })}
                    className="text-sm text-muted-foreground hover:text-black transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground truncate">{tool.url}</p>
              </CardContent>
            </Card>
          ))}
          
          {dashboardData.process.tools.length === 0 && (
            <div className="col-span-full text-center py-6 text-muted-foreground">
              No tools added yet. Click "Add Tool" to get started.
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const renderProfitTab = () => (
    <div className="space-y-8 animate-fade-in">
      <section>
        <h3 className="text-xl font-semibold mb-4">Validate Before You Scale</h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">💡 MVP Snapshot</h4>
            <button
              onClick={() => handleEdit('mvp', { text: dashboardData.profit.mvpDescription })}
              className="text-sm text-muted-foreground hover:text-black transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
          </div>
          
          <Card>
            <CardContent className="pt-4">
              {editing === 'mvp' ? (
                <div className="space-y-4">
                  <Textarea
                    placeholder="What's your smallest testable product?"
                    value={tempFormData.text || ''}
                    onChange={(e) => setTempFormData({ text: e.target.value })}
                    className="w-full min-h-[100px]"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleCancel}
                      className="text-sm text-muted-foreground hover:text-black transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave('mvp', 'profit')}
                      className="text-sm flex items-center gap-1 font-medium"
                    >
                      <Save className="h-3 w-3" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground whitespace-pre-line">
                  {dashboardData.profit.mvpDescription || "What's your smallest testable product?"}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Pre-order / Test</h3>
          <ButtonCustom
            onClick={() => handleEdit('new-testLink', { title: '', url: '' })}
            size="sm"
            className="h-8 px-3 py-1"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Test Link
          </ButtonCustom>
        </div>
        
        {editing && editing.includes('testLink') ? (
          <Card className="mb-4">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title</label>
                  <Input
                    placeholder="e.g., Product Waitlist, Pre-order Page"
                    value={tempFormData.title || ''}
                    onChange={(e) => setTempFormData({ ...tempFormData, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">URL</label>
                  <Input
                    placeholder="https://"
                    value={tempFormData.url || ''}
                    onChange={(e) => setTempFormData({ ...tempFormData, url: e.target.value })}
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={handleCancel}
                    className="text-sm text-muted-foreground hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave('testLink', 'profit')}
                    className="text-sm flex items-center gap-1 font-medium"
                  >
                    <Save className="h-3 w-3" /> Save
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dashboardData.profit.testLinks.map((link, index) => (
            <Card key={index} interactive>
              <CardContent className="pt-4 flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium hover:underline"
                  >
                    {link.title}
                  </a>
                  <button
                    onClick={() => handleEdit(`testLink-${index}`, { ...link })}
                    className="text-sm text-muted-foreground hover:text-black transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground truncate">{link.url}</p>
              </CardContent>
            </Card>
          ))}
          
          {dashboardData.profit.testLinks.length === 0 && (
            <div className="col-span-full text-center py-6 text-muted-foreground">
              No test links added yet. Click "Add Test Link" to get started.
            </div>
          )}
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">📊 Track Numbers</h3>
          <ButtonCustom
            onClick={addNewFinanceRow}
            size="sm"
            className="h-8 px-3 py-1"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Transaction
          </ButtonCustom>
        </div>
        
        {editing && editing.includes('finance') ? (
          <Card className="mb-4">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Date</label>
                    <Input
                      type="date"
                      value={tempFormData.date || ''}
                      onChange={(e) => setTempFormData({ ...tempFormData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Description</label>
                    <Input
                      placeholder="e.g., Client payment, Software subscription"
                      value={tempFormData.description || ''}
                      onChange={(e) => setTempFormData({ ...tempFormData, description: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Income ($)</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={tempFormData.income || 0}
                      onChange={(e) => setTempFormData({ ...tempFormData, income: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Expense ($)</label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={tempFormData.expense || 0}
                      onChange={(e) => setTempFormData({ ...tempFormData, expense: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={handleCancel}
                    className="text-sm text-muted-foreground hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave('finance', 'profit')}
                    className="text-sm flex items-center gap-1 font-medium"
                  >
                    <Save className="h-3 w-3" /> Save
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}
        
        <Card>
          <CardContent className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium px-3 py-2">Date</th>
                    <th className="text-left font-medium px-3 py-2">Description</th>
                    <th className="text-right font-medium px-3 py-2">Income</th>
                    <th className="text-right font-medium px-3 py-2">Expense</th>
                    <th className="text-right font-medium px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.profit.finances.map((item, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="px-3 py-2">{item.date}</td>
                      <td className="px-3 py-2">{item.description || '-'}</td>
                      <td className="px-3 py-2 text-right">${item.income.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right">${item.expense.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right">
                        <button
                          onClick={() => handleEdit(`finance-${index}`, { ...item })}
                          className="text-sm text-muted-foreground hover:text-black transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-medium">
                    <td colSpan={2} className="px-3 py-2 text-right">Net Profit:</td>
                    <td colSpan={3} className="px-3 py-2 text-right">${calculateNetProfit().toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />
      
      <main className="flex-1 pt-16">
        <Container>
          {setupData && (
            <div className="mb-6">
              <div className="flex gap-1 items-center mb-2">
                <span className="text-xs font-medium bg-black text-white px-2 py-0.5 rounded-full">
                  {setupData.stage}
                </span>
                <span className="text-xs text-muted-foreground">
                  • {setupData.founders === 'solo' ? 'Solo Founder' : 'Co-Founders'}
                </span>
              </div>
              <h1 className="text-2xl font-bold">{setupData.businessIdea}</h1>
            </div>
          )}
          
          <Tabs 
            defaultValue="people" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger 
                value="people" 
                className="flex items-center gap-2 py-3"
                onClick={() => setActiveTab("people")}
              >
                <User className="h-4 w-4" />
                <span>People</span>
              </TabsTrigger>
              <TabsTrigger 
                value="process" 
                className="flex items-center gap-2 py-3"
                onClick={() => setActiveTab("process")}
              >
                <Briefcase className="h-4 w-4" />
                <span>Process</span>
              </TabsTrigger>
              <TabsTrigger 
                value="profit" 
                className="flex items-center gap-2 py-3"
                onClick={() => setActiveTab("profit")}
              >
                <DollarSign className="h-4 w-4" />
                <span>Profit</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="people" className="mt-0">
              {renderPeopleTab()}
            </TabsContent>
            
            <TabsContent value="process" className="mt-0">
              {renderProcessTab()}
            </TabsContent>
            
            <TabsContent value="profit" className="mt-0">
              {renderProfitTab()}
            </TabsContent>
          </Tabs>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
