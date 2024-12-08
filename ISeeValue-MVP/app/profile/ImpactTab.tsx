import { useState } from 'react'
import { InfoItem } from './InfoItem'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Plus, X } from 'lucide-react'

export default function ImpactTab({ profile, onEdit }) {
 const [goals, setGoals] = useState([
   {
     id: 1,
     title: 'Achieve carbon neutrality',
     description: 'Achieve carbon neutrality in operations',
     targetDate: '2025-12-31',
     kpis: ['Total CO2 emissions', 'Percentage of renewable energy used'],
     currentStanding: '75% reduction in emissions since 2020 (as of 2023-06-30)',
     tags: ['Environmental', 'Operations'],
   },
 ])

 const [risks, setRisks] = useState([
   {
     id: 1,
     title: 'Supply Chain Disruption',
     description: 'Disruption in raw material supply for solar panel production',
     severity: 4,
   },
 ])

 const [policies, setPolicies] = useState([
   {
     id: 1,
     title: 'Sustainable Procurement Policy',
     description: 'Guidelines for selecting environmentally and socially responsible suppliers',
     effectiveDate: '2022-01-01',
     tags: ['Supply Chain', 'Environmental'],
   },
 ])

 const handleAddGoal = (newGoal) => {
   setGoals([...goals, { id: goals.length + 1, ...newGoal }])
 }

 const handleAddRisk = (newRisk) => {
   setRisks([...risks, { id: risks.length + 1, ...newRisk }])
 }

 const handleAddPolicy = (newPolicy) => {
   setPolicies([...policies, { id: policies.length + 1, ...newPolicy }])
 }

 return (
   <div className="space-y-8">
     <section>
       <h3 className="text-xl font-semibold mb-4">ESG Description</h3>
       <div className="space-y-4">
         <InfoItem label="Environmental" value={profile.esgDescription.environmental} field="esgDescription.environmental" onEdit={onEdit} visibility={profile.visibility.esgDescription} />
         <InfoItem label="Social" value={profile.esgDescription.social} field="esgDescription.social" onEdit={onEdit} visibility={profile.visibility.esgDescription} />
         <InfoItem label="Governance" value={profile.esgDescription.governance} field="esgDescription.governance" onEdit={onEdit} visibility={profile.visibility.esgDescription} />
       </div>
     </section>

     <section>
       <h3 className="text-xl font-semibold mb-4">Goals</h3>
       <div className="space-y-4">
         {goals.map((goal) => (
           <Card key={goal.id}>
             <CardHeader>
               <CardTitle>{goal.title}</CardTitle>
             </CardHeader>
             <CardContent>
               <p><strong>Description:</strong> {goal.description}</p>
               <p><strong>Target Date:</strong> {goal.targetDate}</p>
               <p><strong>KPIs:</strong> {goal.kpis.join(', ')}</p>
               <p><strong>Current Standing:</strong> {goal.currentStanding}</p>
               <p><strong>Tags:</strong> {goal.tags.join(', ')}</p>
             </CardContent>
           </Card>
         ))}
         <Dialog>
           <DialogTrigger asChild>
             <Button>Add New Goal</Button>
           </DialogTrigger>
           <DialogContent>
             <DialogHeader>
               <DialogTitle>Add New Goal</DialogTitle>
               <DialogDescription>Enter the details of your new goal.</DialogDescription>
             </DialogHeader>
             <form onSubmit={(e) => {
               e.preventDefault()
               const formData = new FormData(e.currentTarget)
               const newGoal = {
                 title: formData.get('title') as string,
                 description: formData.get('description') as string,
                 targetDate: formData.get('targetDate') as string,
                 kpis: (formData.get('kpis') as string).split(','),
                 currentStanding: formData.get('currentStanding') as string,
                 tags: (formData.get('tags') as string).split(','),
               }
               handleAddGoal(newGoal)
             }}>
               <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="title" className="text-right">Title</Label>
                   <Input id="title" name="title" className="col-span-3" required />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="description" className="text-right">Description</Label>
                   <Textarea id="description" name="description" className="col-span-3" required />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="targetDate" className="text-right">Target Date</Label>
                   <Input id="targetDate" name="targetDate" type="date" className="col-span-3" required />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="kpis" className="text-right">KPIs</Label>
                   <Input id="kpis" name="kpis" className="col-span-3" placeholder="Comma-separated list" required />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="currentStanding" className="text-right">Current Standing</Label>
                   <Input id="currentStanding" name="currentStanding" className="col-span-3" required />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="tags" className="text-right">Tags</Label>
                   <Input id="tags" name="tags" className="col-span-3" placeholder="Comma-separated list" required />
                 </div>
               </div>
               <div className="flex justify-end">
                 <Button type="submit">Add Goal</Button>
               </div>
             </form>
           </DialogContent>
         </Dialog>
       </div>
     </section>

     <section>
       <h3 className="text-xl font-semibold mb-4">Risks and Materiality</h3>
       <div className="space-y-4">
         {risks.map((risk) => (
           <Card key={risk.id}>
             <CardHeader>
               <CardTitle>Risk: {risk.title}</CardTitle>
             </CardHeader>
             <CardContent>
               <p><strong>Description:</strong> {risk.description}</p>
               <p><strong>Severity:</strong> {risk.severity}/5</p>
             </CardContent>
           </Card>
         ))}
         <Dialog>
           <DialogTrigger asChild>
             <Button>Add New Risk</Button>
           </DialogTrigger>
           <DialogContent>
             <DialogHeader>
               <DialogTitle>Add New Risk</DialogTitle>
               <DialogDescription>Enter the details of the new risk.</DialogDescription>
             </DialogHeader>
             <form onSubmit={(e) => {
               e.preventDefault()
               const formData = new FormData(e.currentTarget)
               const newRisk = {
                 title: formData.get('title') as string,
                 description: formData.get('description') as string,
                 severity: parseInt(formData.get('severity') as string),
               }
               handleAddRisk(newRisk)
             }}>
               <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="title" className="text-right">Title</Label>
                   <Input id="title" name="title" className="col-span-3" required />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="description" className="text-right">Description</Label>
                   <Textarea id="description" name="description" className="col-span-3" required />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="severity" className="text-right">Severity (1-5)</Label>
                   <Input id="severity" name="severity" type="number" min="1" max="5" className="col-span-3" required />
                 </div>
               </div>
               <div className="flex justify-end">
                 <Button type="submit">Add Risk</Button>
               </div>
             </form>
           </DialogContent>
         </Dialog>
       </div>
     </section>

     <section>
       <h3 className="text-xl font-semibold mb-4">Policies</h3>
       <div className="space-y-4">
         {policies.map((policy) => (
           <Card key={policy.id}>
             <CardHeader>
               <CardTitle>{policy.title}</CardTitle>
             </CardHeader>
             <CardContent>
               <p><strong>Description:</strong> {policy.description}</p>
               <p><strong>Effective Date:</strong> {policy.effectiveDate}</p>
               <p><strong>Tags:</strong> {policy.tags.join(', ')}</p>
             </CardContent>
           </Card>
         ))}
         <Dialog>
           <DialogTrigger asChild>
             <Button>Add New Policy</Button>
           </DialogTrigger>
           <DialogContent>
             <DialogHeader>
               <DialogTitle>Add New Policy</DialogTitle>
               <DialogDescription>Enter the details of the new policy.</DialogDescription>
             </DialogHeader>
             <form onSubmit={(e) => {
               e.preventDefault()
               const formData = new FormData(e.currentTarget)
               const newPolicy = {
                 title: formData.get('title') as string,
                 description: formData.get('description') as string,
                 effectiveDate: formData.get('effectiveDate') as string,
                 tags: (formData.get('tags') as string).split(','),
               }
               handleAddPolicy(newPolicy)
             }}>
               <div className="grid gap-4 py-4">
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="title" className="text-right">Title</Label>
                   <Input id="title" name="title" className="col-span-3" required />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="description" className="text-right">Description</Label>
                   <Textarea id="description" name="description" className="col-span-3" required />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="effectiveDate" className="text-right">Effective Date</Label>
                   <Input id="effectiveDate" name="effectiveDate" type="date" className="col-span-3" required />
                 </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                   <Label htmlFor="tags" className="text-right">Tags</Label>
                   <Input id="tags" name="tags" className="col-span-3" placeholder="Comma-separated list" required />
                 </div>
               </div>
               <div className="flex justify-end">
                 <Button type="submit">Add Policy</Button>
               </div>
             </form>
           </DialogContent>
         </Dialog>
       </div>
     </section>
   </div>
 )
}

