import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProjectsTab() {
 const [projects, setProjects] = useState([
   { id: 1, name: 'City-wide Smart Grid Implementation', status: 'In Progress', description: 'Implementing a smart grid system across the city to optimize energy distribution and consumption.' },
   { id: 2, name: 'Offshore Wind Farm Development', status: 'Planning', description: 'Planning and development of an offshore wind farm to increase renewable energy production.' },
 ])

 const handleCreateProject = (newProject) => {
   setProjects([...projects, { id: projects.length + 1, ...newProject }])
 }

 return (
   <div className="space-y-4">
     <h2 className="text-2xl font-bold mb-4">Projects</h2>
     {projects.map(project => (
       <Card key={project.id}>
         <CardHeader>
           <CardTitle>{project.name}</CardTitle>
         </CardHeader>
         <CardContent>
           <p><strong>Status:</strong> {project.status}</p>
           <p><strong>Description:</strong> {project.description}</p>
         </CardContent>
       </Card>
     ))}
     <Dialog>
       <DialogTrigger asChild>
         <Button>Create New Project</Button>
       </DialogTrigger>
       <DialogContent>
         <DialogHeader>
           <DialogTitle>Create New Project</DialogTitle>
           <DialogDescription>
             Enter the details of your new project.
           </DialogDescription>
         </DialogHeader>
         <form onSubmit={(e) => {
           e.preventDefault()
           const formData = new FormData(e.currentTarget)
           const newProject = {
             name: formData.get('projectName') as string,
             status: formData.get('projectStatus') as string,
             description: formData.get('projectDescription') as string,
           }
           handleCreateProject(newProject)
         }}>
           <div className="grid gap-4 py-4">
             <div className="grid grid-cols-4 items-center gap-4">
               <Label htmlFor="projectName" className="text-right">
                 Project Name
               </Label>
               <Input id="projectName" name="projectName" className="col-span-3" required />
             </div>
             <div className="grid grid-cols-4 items-center gap-4">
               <Label htmlFor="projectStatus" className="text-right">
                 Status
               </Label>
               <Select name="projectStatus" required>
                 <SelectTrigger className="col-span-3">
                   <SelectValue placeholder="Select status" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="Planning">Planning</SelectItem>
                   <SelectItem value="In Progress">In Progress</SelectItem>
                   <SelectItem value="Completed">Completed</SelectItem>
                   <SelectItem value="On Hold">On Hold</SelectItem>
                 </SelectContent>
               </Select>
             </div>
             <div className="grid grid-cols-4 items-center gap-4">
               <Label htmlFor="projectDescription" className="text-right">
                 Description
               </Label>
               <Textarea id="projectDescription" name="projectDescription" className="col-span-3" required />
             </div>
           </div>
           <div className="flex justify-end">
             <Button type="submit">Create Project</Button>
           </div>
         </form>
       </DialogContent>
     </Dialog>
   </div>
 )
}

