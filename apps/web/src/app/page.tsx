import { Loader2 } from "lucide-react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import { onboardUser } from "~/actions/onboard-user";
import { getUsers } from "~/actions/get-users";

export default async function Component() {
  const data = await getUsers();
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <header className="sticky top-0 z-30 bg-background border-b px-4 py-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <form action={onboardUser} className="flex-1 flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="name" className="sr-only">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Name"
                className="bg-background"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="org" className="sr-only">
                Organization
              </Label>
              <Input
                id="org"
                name="org"
                placeholder="Organization"
                className="bg-background"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="project" className="sr-only">
                Project
              </Label>
              <Input
                id="project"
                name="project"
                placeholder="Project"
                className="bg-background"
              />
            </div>
            <Button type="submit">Onboard</Button>
          </form>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Current Items</CardTitle>
              <CardDescription>
                View and manage your current items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.org}</TableCell>
                      <TableCell>{item.project}</TableCell>
                      <TableCell>
                        {item.onboarded ? (
                          "Onboarded"
                        ) : (
                          <Loader2 className="size-4 animate-spin" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
